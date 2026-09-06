import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

import { sendEmail } from "../_shared/email/service.ts";

import { purchaseRequestNotification } from "../email-templates/internal/purchase-request.ts";
import { commissionEnquiryNotification } from "../email-templates/internal/commission-enquiry.ts";
import { feedbackNotification } from "../email-templates/internal/feedback.ts";
import { renderContactMessage } from "../email-templates/internal/contact-message.ts";

import { purchaseRequestReceivedEmail } from "../email-templates/customer/purchase-request-received.ts";
import { commissionEnquiryReceivedEmail } from "../email-templates/customer/commission-enquiry-received.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const notificationEmail =
  Deno.env.get("CONTACT_NOTIFICATION_EMAIL")!;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const payload = await req.json();

    const record = payload?.record;

    if (!record) {
      throw new Error("Missing webhook record");
    }

    const table = payload?.table;

    /*
     * ============================================================
     * INQUIRY NOTIFICATIONS
     * ============================================================
     */

    if (table === "inquiries") {
      const inquiryType = record.inquiry_type;

      if (
        inquiryType !== "ART_PURCHASE" &&
        inquiryType !== "COMMISSION"
      ) {
        throw new Error(
          `Unsupported inquiry type: ${inquiryType}`,
        );
      }

      let artworkTitle = "Artwork";

      if (record.artwork_id) {
        const { data: artwork, error: artworkError } =
          await supabase
            .from("artworks")
            .select("title")
            .eq("id", record.artwork_id)
            .single();

        if (artworkError) {
          throw artworkError;
        }

        artworkTitle = artwork?.title ?? "Artwork";
      }

      const referenceNumber =
        record.order_number ??
        record.id?.slice(0, 8) ??
        "N/A";

      /*
       * ==========================================================
       * ADMIN NOTIFICATION
       * ==========================================================
       */

      let emailContent;

      if (inquiryType === "ART_PURCHASE") {
        const artworkPrice =
          record.artwork_price_snapshot != null
            ? `₹${Number(
                record.artwork_price_snapshot,
              ).toLocaleString("en-IN")}`
            : "Not specified";

        emailContent = purchaseRequestNotification({
          customerName:
            record.customer_name ?? "",
          customerEmail:
            record.customer_email ?? "",
          customerPhone:
            record.customer_phone ?? "",
          country:
            record.country ?? "",
          artworkTitle,
          artworkPrice,
          referenceNumber,
          note:
            record.note ?? "",
        });
      } else {
        emailContent =
          commissionEnquiryNotification({
            customerName:
              record.customer_name ?? "",
            customerEmail:
              record.customer_email ?? "",
            customerPhone:
              record.customer_phone ?? "",
            country:
              record.country ?? "",
            budget:
              record.budget ?? "",
            deadline:
              record.deadline ?? "",
            note:
              record.note ?? "",
            referenceNumber,
          });
      }

      const adminEmailResponse =
        await sendEmail({
          to: notificationEmail,
          subject:
            emailContent.subject,
          html:
            emailContent.html,
          text:
            emailContent.text,
          replyTo:
            record.customer_email,
        });

      if (!adminEmailResponse.success) {
        throw new Error(
          adminEmailResponse.error ||
            "Failed to send notification email",
        );
      }

      console.log(
        `Admin notification sent for ${inquiryType}`,
        {
          inquiryId: record.id,
          messageId:
            adminEmailResponse.messageId,
        },
      );

      /*
       * ==========================================================
       * CUSTOMER CONFIRMATION EMAIL
       * ==========================================================
       */

      let customerEmailContent;

      if (inquiryType === "ART_PURCHASE") {
        const artworkPrice =
          record.artwork_price_snapshot != null
            ? `₹${Number(
                record.artwork_price_snapshot,
              ).toLocaleString("en-IN")}`
            : "Not specified";

        customerEmailContent =
          purchaseRequestReceivedEmail({
            customerName:
              record.customer_name ?? "",
            artworkTitle,
            artworkPrice,
            referenceNumber,
          });
      } else {
        customerEmailContent =
          commissionEnquiryReceivedEmail({
            customerName:
              record.customer_name ?? "",
            referenceNumber,
          });
      }

      const customerEmailResponse =
        await sendEmail({
          to: record.customer_email,
          subject:
            customerEmailContent.subject,
          html:
            customerEmailContent.html,
          text:
            customerEmailContent.text,
        });

      /*
       * Customer email failure should NOT
       * make the inquiry itself fail.
       *
       * The inquiry is already stored and
       * the admin notification succeeded.
       */

      if (!customerEmailResponse.success) {
        console.error(
          "CUSTOMER CONFIRMATION EMAIL ERROR:",
          {
            inquiryId: record.id,
            customerEmail:
              record.customer_email,
            error:
              customerEmailResponse.error,
          },
        );
      } else {
        console.log(
          `Customer confirmation sent for ${inquiryType}`,
          {
            inquiryId: record.id,
            customerEmail:
              record.customer_email,
            messageId:
              customerEmailResponse.messageId,
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          messageId:
            adminEmailResponse.messageId,
          customerNotificationSent:
            customerEmailResponse.success,
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }

    /*
     * ============================================================
     * CUSTOMER FEEDBACK NOTIFICATIONS
     * ============================================================
     */

    if (table === "customer_feedback") {
      const emailContent =
        feedbackNotification({
          name: record.name ?? "",
          message: record.message ?? "",
          allowPublish:
            record.allow_publish ?? false,
          createdAt:
            record.created_at ?? "",
        });

      const emailResponse =
        await sendEmail({
          to: notificationEmail,
          subject:
            emailContent.subject,
          html:
            emailContent.html,
          text:
            emailContent.text,
        });

      if (!emailResponse.success) {
        throw new Error(
          emailResponse.error ||
            "Failed to send feedback notification",
        );
      }

      console.log(
        "Admin feedback notification sent",
        {
          feedbackId: record.id,
          messageId:
            emailResponse.messageId,
        },
      );

      return new Response(
        JSON.stringify({
          success: true,
          messageId:
            emailResponse.messageId,
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }

    /*
     * ============================================================
     * CONTACT MESSAGE NOTIFICATIONS
     * ============================================================
     */

    if (table === "contact_messages") {
      const emailContent =
        renderContactMessage({
          name:
            record.name ?? "",
          email:
            record.email ?? "",
          phone:
            record.phone ?? null,
          message:
            record.message ?? "",
          contactId:
            record.id,
        });

      const emailResponse =
        await sendEmail({
          to: notificationEmail,
          subject:
            emailContent.subject,
          html:
            emailContent.html,
          text:
            emailContent.text,
          replyTo:
            record.email,
        });

      if (!emailResponse.success) {
        throw new Error(
          emailResponse.error ||
            "Failed to send contact notification",
        );
      }

      console.log(
        "Admin contact notification sent",
        {
          contactId: record.id,
          messageId:
            emailResponse.messageId,
        },
      );

      return new Response(
        JSON.stringify({
          success: true,
          messageId:
            emailResponse.messageId,
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }

    throw new Error(
      `Unsupported webhook table: ${table}`,
    );
  } catch (error) {
    console.error(
      "NOTIFY ADMIN ERROR:",
      error,
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send admin notification",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      },
    );
  }
});