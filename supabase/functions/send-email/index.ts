import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

import { sendEmail } from "../_shared/email/service.ts";
import { requestPaymentEmail } from "../email-templates/customer/request-payment.ts";
import { commissionConversationEmail } from "../email-templates/customer/commission-conversation.ts";
import { commissionPaymentEmail } from "../email-templates/customer/commission-payment.ts";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function getPublicMediaUrl(path: string) {
  return supabase.storage
    .from("artworks")
    .getPublicUrl(path)
    .data.publicUrl;
}


serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const {
      inquiryId,
      template,
      paymentId,
      action = "send",
      subject: providedSubject,
      body: providedBody,
    } = await req.json();

    if (!inquiryId) {
      throw new Error("Missing inquiryId");
    }

    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .select(`
        *,
        artworks (
          *,
          artwork_media!artwork_media_artwork_id_fkey (
            id,
            role,
            sort_order,
            thumb_path
          )
        )
      `)
      .eq("id", inquiryId)
      .single();

    if (error) throw error;

    if (!inquiry) {
      throw new Error("Inquiry not found");
    }

    const media = inquiry.artworks?.artwork_media ?? [];

    const primaryMedia =
      media.find(
        (item: any) => item.role === "primary",
      ) ??
      [...media].sort(
        (a: any, b: any) =>
          a.sort_order - b.sort_order,
      )[0];

    const artworkImage = primaryMedia
      ? getPublicMediaUrl(
          primaryMedia.thumb_path,
        )
      : "";

    let html = "";
    let text = "";
    let subject = "";

    switch (template) {
      /*
       * =====================================================
       * GALLERY PURCHASE
       * =====================================================
       */

      case "request-payment": {
        if (!inquiry.artworks) {
          throw new Error(
            "Artwork not found for this purchase inquiry",
          );
        }

        const emailContent = requestPaymentEmail({
          customerName:
            inquiry.customer_name,

          artworkTitle:
            inquiry.artworks.title,

          artworkImage,

          artworkPrice: `₹${Number(
            inquiry.artwork_price_snapshot,
          ).toLocaleString("en-IN")}`,

          artworkMedium:
            inquiry.artworks.medium ?? "",

          artworkDimensions:
            inquiry.artworks.dimensions ?? "",

          collectorPortal:
            inquiry.customer_link ?? "",

          referenceNumber:
            inquiry.order_number ?? inquiry.id.slice(0, 8),
        });

        subject = emailContent.subject;
        html = emailContent.html;
        text = emailContent.text;

        break;
      }


            /*
       * =====================================================
       * COMMISSION PAYMENT
       * =====================================================
       */
      case "commission-payment": {
        if (inquiry.inquiry_type !== "COMMISSION") {
          throw new Error(
            "This email template is only available for commission inquiries",
          );
        }


        if (!paymentId) {
          throw new Error("Missing paymentId");
        }

        const { data: payment, error: paymentError } =
          await supabase
            .from("commission_payments")
            .select(`
              id,
              inquiry_id,
              payment_number,
              amount,
              status,
              customer_link,
              is_final
            `)
            .eq("id", paymentId)
            .eq("inquiry_id", inquiryId)
            .single();

        if (paymentError) throw paymentError;

        if (!payment) {
          throw new Error("Commission payment not found");
        }

        if (!payment.customer_link) {
          throw new Error(
            "Payment link has not been generated yet",
          );
        }

        const amount = `₹${Number(
          payment.amount,
        ).toLocaleString("en-IN")}`;

        const emailContent = commissionPaymentEmail({
          customerName: inquiry.customer_name,
          paymentNumber: payment.payment_number,
          amount,
          customerLink: payment.customer_link,
          isFinal: payment.is_final,
        });

        subject = emailContent.subject;
        html = emailContent.html;
        text = emailContent.text;

        break;

      }

      /*
       * =====================================================
       * COMMISSION CONVERSATION
       * =====================================================
       */
      case "commission-conversation": {
        if (inquiry.inquiry_type !== "COMMISSION") {
          throw new Error(
            "This email template is only available for commission inquiries",
          );
        }

        if (!providedSubject?.trim()) {
          throw new Error("Email subject is required");
        }

        if (!providedBody?.trim()) {
          throw new Error("Email body is required");
        }

        const emailContent = commissionConversationEmail({
          subject: providedSubject,
          body: providedBody,
        });

        subject = emailContent.subject;
        html = emailContent.html;
        text = emailContent.text;

        break;
      }

      default:
        throw new Error(
          `Unknown email template: ${template}`,
        );
    }

        /*
        * PREVIEW
        *
        * Generate the exact HTML but don't send anything.
        */
        if (action === "preview") {
          return new Response(
            JSON.stringify({
              success: true,
              subject,
              html,
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

        /*
        * SEND
        */

        let messageId: string | undefined;

        if (
          template === "request-payment" ||
          template === "commission-payment" ||
          template === "commission-conversation"
        ) {
          const emailResponse = await sendEmail({
            to: inquiry.customer_email,
            subject,
            html,
            text,
          });
          
          if (!emailResponse.success) {
            throw new Error(
              emailResponse.error ||
                "Failed to send email",
            );
          }

          messageId = emailResponse.messageId;

          console.log(
            `Email sent successfully to ${inquiry.customer_email}`,
            messageId,
          );
        }


        return new Response(
          JSON.stringify({
            success: true,
            message: "Email sent successfully",
            messageId,
          }),
          {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          },
        );
      } catch (err) {
        console.error(
          "SEND EMAIL ERROR:",
          err,
        );

        return new Response(
          JSON.stringify({
            success: false,
            error:
              err instanceof Error
                ? err.message
                : "Unknown error occurred",
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