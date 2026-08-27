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
    const { paymentId } = await req.json();

    if (!paymentId) {
      throw new Error("Missing paymentId");
    }

    /*
     * Fetch the commission payment together with
     * the parent inquiry.
     */
    const { data: payment, error: paymentError } =
      await supabase
        .from("commission_payments")
        .select(`
          *,
          inquiries (
            id,
            customer_token,
            order_number,
            customer_name,
            customer_email,
            customer_phone,
            note
            )
        `)
        .eq("id", paymentId)
        .single();

    if (paymentError) throw paymentError;

    if (!payment) {
      throw new Error("Commission payment not found");
    }

    const inquiry = payment.inquiries;

    if (!inquiry) {
      throw new Error("Commission inquiry not found");
    }


    /*
     * If a payment link already exists, reuse it.
     *
     * This prevents accidental creation of multiple
     * Razorpay links for the same payment record.
     */
    if (payment.customer_link) {
        return new Response(
            JSON.stringify({
            success: true,
            url: payment.customer_link,
            payment: {
                id: payment.id,
                inquiry_id: payment.inquiry_id,
                customer_token: inquiry.customer_token,
                payment_number: payment.payment_number,
                amount: payment.amount,
                status: payment.status,
                customer_link: payment.customer_link,
                is_final: payment.is_final,
                requested_at: payment.requested_at,
                paid_at: payment.paid_at,
                created_at: payment.created_at,
            },
            }),
            {
            status: 200,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
            },
        );
    }

    const keyId = Deno.env.get("RAZORPAY_KEY_ID")!;
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;

    const auth = btoa(`${keyId}:${keySecret}`);

    const paymentNumber = payment.payment_number;

    const response = await fetch(
      "https://api.razorpay.com/v1/payment_links",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(payment.amount) * 100,
          currency: "INR",

          reference_id: payment.id,

          accept_partial: false,

          description:
            `Please ensure you are paying to the right reference number.\nREFERENCE NO - ${inquiry.order_number} \nCommission Payment - ${paymentNumber}`,

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
            commission_payment_id: payment.id,
            inquiry_id: inquiry.id,
            payment_number: String(paymentNumber),
            order_number: inquiry.order_number ?? "",
          },

          callback_url:
            `${Deno.env.get("SITE_URL")}/commission-payment/${payment.id}?payment=success`,

          callback_method: "get",
        }),
      },
    );

    const razorpayPayment = await response.json();

    if (!response.ok) {
      console.error(
        "RAZORPAY ERROR:",
        razorpayPayment,
      );

      throw new Error(
        razorpayPayment.error?.description ??
          JSON.stringify(razorpayPayment),
      );
    }

    const now = new Date().toISOString();

    /*
     * Save the payment link against THIS payment row.
     */
    const { data: updatedPayment, error: updateError } =
      await supabase
        .from("commission_payments")
        .update({
          customer_link: razorpayPayment.short_url,
          status: "REQUESTED",
          requested_at: payment.requested_at ?? now,
        })
        .eq("id", payment.id)
        .select()
        .single();

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({
        success: true,
        url: razorpayPayment.short_url,
        payment: {
            ...updatedPayment,
            customer_token: inquiry.customer_token,
        },
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
      "CREATE COMMISSION PAYMENT LINK ERROR:",
      err,
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          err?.message ??
          "Failed to create commission payment link",
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