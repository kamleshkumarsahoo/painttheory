import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, apikey, x-client-info, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { inquiryId } = await req.json();

    if (!inquiryId) {
      throw new Error("Missing inquiryId");
    }

    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .select(`
        *,
        artworks(
          title
        )
      `)
      .eq("id", inquiryId)
      .single();

    if (error) throw error;

    if (!inquiry) {
      throw new Error("Inquiry not found");
    }

    const keyId = Deno.env.get("RAZORPAY_KEY_ID")!;
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;

    const auth = btoa(`${keyId}:${keySecret}`);

    const expectedAmount =
      Number(inquiry.artwork_price_snapshot) * 100;

    if (!Number.isFinite(expectedAmount) || expectedAmount <= 0) {
      throw new Error("Invalid artwork payment amount");
    }

    /*
     * Check whether an existing Razorpay Payment Link
     * is still valid for the CURRENT artwork price.
     */
    if (
      inquiry.razorpay_payment_link &&
      inquiry.razorpay_payment_link_id &&
      inquiry.payment_status !== "PAID"
    ) {
      const existingResponse = await fetch(
        `https://api.razorpay.com/v1/payment_links/${inquiry.razorpay_payment_link_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (existingResponse.ok) {
        const existingPayment =
          await existingResponse.json();

        /*
         * Reuse the existing Payment Link ONLY when:
         *
         * 1. Its amount matches the current artwork price.
         * 2. The link is still created/active.
         */
        if (
          Number(existingPayment.amount) === expectedAmount &&
          existingPayment.status === "created"
        ) {
          const now = new Date().toISOString();

          await supabase
            .from("inquiries")
            .update({
              inquiry_status:
                statusRank(inquiry.inquiry_status) <
                statusRank("PAYMENT_REQUESTED")
                  ? "PAYMENT_REQUESTED"
                  : inquiry.inquiry_status,
              reviewed_at:
                inquiry.reviewed_at ?? now,
              payment_requested_at:
                inquiry.payment_requested_at ?? now,
              updated_at: now,
            })
            .eq("id", inquiry.id);

          return new Response(
            JSON.stringify({
              url: inquiry.razorpay_payment_link,
            }),
            {
              headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
              },
            },
          );
        }

        /*
         * Existing Payment Link has a different amount.
         *
         * Cancel it before creating a new one.
         */
        if (existingPayment.status === "created") {
          const cancelResponse = await fetch(
            `https://api.razorpay.com/v1/payment_links/${inquiry.razorpay_payment_link_id}/cancel`,
            {
              method: "POST",
              headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (!cancelResponse.ok) {
            const cancelError =
              await cancelResponse.json();

            console.error(
              "Failed to cancel old Razorpay payment link:",
              cancelError,
            );

            throw new Error(
              "Could not replace the existing payment link.",
            );
          }
        }
      } else {
        /*
         * The old Payment Link may no longer exist.
         * We can safely continue and create a new one.
         */
        const existingError =
          await existingResponse.text();

        console.warn(
          "Could not fetch existing Razorpay payment link:",
          existingError,
        );
      }
    }

    /*
     * Create a new Razorpay Payment Link.
     */
    const response = await fetch(
      "https://api.razorpay.com/v1/payment_links",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: expectedAmount,
          currency: "INR",

          reference_id:
            `${inquiry.id.slice(0, 8)}-${Date.now()}`,

          accept_partial: false,

          description:
            inquiry.artworks.title,

          customer: {
            name: inquiry.customer_name,
            email: inquiry.customer_email,
            contact: inquiry.customer_phone,
          },

          notify: {
            sms: false,
            email: false,
          },

          notes: {
            inquiry_id: inquiry.id,
            order_number:
              inquiry.order_number,
            customer_token:
              inquiry.customer_token,
            artwork:
              inquiry.artworks.title,
          },

          callback_url:
            `${Deno.env.get("SITE_URL")}/order/${inquiry.customer_token}?payment=success`,

          callback_method: "get",
        }),
      },
    );

    const payment = await response.json();

    if (!response.ok) {
      console.error(
        "RAZORPAY PAYMENT LINK ERROR:",
        payment,
      );

      throw new Error(
        payment.error?.description ??
          JSON.stringify(payment),
      );
    }

    const now = new Date().toISOString();

    /*
     * Save the NEW Payment Link against the inquiry.
     */
    const { error: updateError } =
      await supabase
        .from("inquiries")
        .update({
          razorpay_payment_link:
            payment.short_url,
          razorpay_payment_link_id:
            payment.id,

          inquiry_status:
            statusRank(inquiry.inquiry_status) <
            statusRank("PAYMENT_REQUESTED")
              ? "PAYMENT_REQUESTED"
              : inquiry.inquiry_status,

          reviewed_at:
            inquiry.reviewed_at ?? now,

          payment_requested_at:
            inquiry.payment_requested_at ?? now,

          updated_at: now,
        })
        .eq("id", inquiry.id);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        url: payment.short_url,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );

  } catch (err: any) {
    console.error(
      "CREATE PAYMENT LINK ERROR:",
      err,
    );

    return new Response(
      JSON.stringify({
        error:
          err?.message ??
          "Failed to create payment link",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});

function statusRank(status?: string | null) {
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