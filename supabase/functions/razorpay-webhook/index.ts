import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  try {
    const body = await req.json();

    console.log("Webhook Event:", body.event);

    if (body.event !== "payment_link.paid") {
      return new Response("Ignored", {
        status: 200,
      });
    }

    const payment = body.payload?.payment?.entity;
    const paymentLink =
      body.payload?.payment_link?.entity;
    const order = body.payload?.order?.entity;

    if (!payment || !paymentLink) {
      console.error(
        "Invalid Razorpay webhook payload",
      );

      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid webhook payload",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const referenceId =
      paymentLink.reference_id ?? null;

    const notes = paymentLink.notes ?? {};

    const paidAt =
      payment.created_at
        ? new Date(
            payment.created_at * 1000,
          ).toISOString()
        : new Date().toISOString();

    console.log("Payment Link ID:", paymentLink.id);
    console.log("Reference ID:", referenceId);
    console.log("Payment ID:", payment.id);
    console.log("Payment Link Notes:", notes);

    /*
     * ============================================================
     * COMMISSION PAYMENT
     *
     * Commission payment links store:
     *
     *     notes.commission_payment_id
     *
     * as the commission_payments.id.
     *
     * We use the notes value instead of reference_id because
     * reference_id is not guaranteed to have the same format
     * for gallery purchases.
     * ============================================================
     */

    const commissionPaymentId =
      notes.commission_payment_id ?? null;

    if (commissionPaymentId) {
      console.log(
        "Looking up commission payment:",
        commissionPaymentId,
      );

      const {
        data: commissionPayment,
        error: commissionLookupError,
      } = await supabase
        .from("commission_payments")
        .select(
          "id, status, payment_number, amount",
        )
        .eq("id", commissionPaymentId)
        .maybeSingle();

      if (commissionLookupError) {
        console.error(
          "Commission payment lookup error:",
          commissionLookupError,
        );

        return new Response(
          JSON.stringify({
            success: false,
            error:
              commissionLookupError.message,
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }

      if (!commissionPayment) {
        console.error(
          "Commission payment not found:",
          commissionPaymentId,
        );

        return new Response(
          JSON.stringify({
            success: false,
            error:
              "Commission payment not found",
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }

      console.log(
        `Commission payment ${commissionPayment.payment_number} paid`,
      );

      const {
        error: commissionUpdateError,
      } = await supabase
        .from("commission_payments")
        .update({
          status: "PAID",
          paid_at: paidAt,
        })
        .eq("id", commissionPayment.id);

      if (commissionUpdateError) {
        console.error(
          "Commission payment update error:",
          commissionUpdateError,
        );

        return new Response(
          JSON.stringify({
            success: false,
            error:
              commissionUpdateError.message,
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          type: "COMMISSION_PAYMENT",
          paymentId: commissionPayment.id,
          paymentNumber:
            commissionPayment.payment_number,
          status: "PAID",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    /*
     * ============================================================
     * GALLERY PURCHASE
     *
     * Gallery payment links store:
     *
     *     notes.inquiry_id
     *
     * as the inquiries.id.
     *
     * This is the authoritative way to find the inquiry.
     * ============================================================
     */

    const inquiryId =
      notes.inquiry_id ?? null;

    if (!inquiryId) {
      console.error(
        "No inquiry_id found in Razorpay payment-link notes.",
        {
          referenceId,
          paymentLinkId: paymentLink.id,
        },
      );

      return new Response(
        JSON.stringify({
          success: false,
          error:
            "No inquiry_id found in payment link notes",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    console.log(
      "Looking up gallery inquiry:",
      inquiryId,
    );

    const {
      data: inquiry,
      error: inquiryError,
    } = await supabase
      .from("inquiries")
      .select(
        "id, inquiry_status, reviewed_at, payment_requested_at",
      )
      .eq("id", inquiryId)
      .single();

    if (inquiryError) {
      console.error(
        "Gallery inquiry lookup error:",
        inquiryError,
      );

      return new Response(
        JSON.stringify({
          success: false,
          error: inquiryError.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const { error: inquiryUpdateError } =
      await supabase
        .from("inquiries")
        .update({
          inquiry_status:
            statusRank(inquiry.inquiry_status) <
            statusRank("PAID")
              ? "PAID"
              : inquiry.inquiry_status,

          payment_status: "PAID",

          reviewed_at:
            inquiry.reviewed_at ?? paidAt,

          payment_requested_at:
            inquiry.payment_requested_at ??
            paidAt,

          paid_at: paidAt,

          razorpay_payment_id:
            payment.id,

          razorpay_payment_link_id:
            paymentLink.id,

          razorpay_order_id:
            order?.id ?? null,

          updated_at: paidAt,
        })
        .eq("id", inquiryId);

    if (inquiryUpdateError) {
      console.error(
        "Gallery inquiry update error:",
        inquiryUpdateError,
      );

      return new Response(
        JSON.stringify({
          success: false,
          error:
            inquiryUpdateError.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    console.log(
      `Gallery inquiry ${inquiryId} marked PAID`,
    );

    return new Response(
      JSON.stringify({
        success: true,
        type: "GALLERY_PURCHASE",
        inquiryId,
        paymentId: payment.id,
        paymentLinkId: paymentLink.id,
        status: "PAID",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    console.error(
      "RAZORPAY WEBHOOK ERROR:",
      err,
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Unknown webhook error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
});

function statusRank(
  status?: string | null,
) {
  return [
    "NEW",
    "REVIEWED",
    "PAYMENT_REQUESTED",
    "PAID",
    "ADDRESS_RECEIVED",
    "SHIPPED",
    "DELIVERED",
  ].indexOf(status ?? "");
}