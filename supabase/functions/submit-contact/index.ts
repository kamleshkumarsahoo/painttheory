import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";
import { sendEmail } from "../_shared/email/service.ts";
import { renderContactMessage } from "../email-templates/internal/contact-message.ts";

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
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const phone =
      String(body.phone ?? "").trim() || null;
    const message = String(body.message ?? "").trim();

    if (!name) {
      throw new Error("Name is required.");
    }

    if (!email) {
      throw new Error("Email is required.");
    }

    if (!message) {
      throw new Error("Message is required.");
    }

    if (name.length > 120) {
      throw new Error("Name is too long.");
    }

    if (email.length > 254) {
      throw new Error("Email is too long.");
    }

    if (phone && phone.length > 30) {
      throw new Error("Phone number is too long.");
    }

    if (message.length > 5000) {
      throw new Error("Message is too long.");
    }

    /*
     * Save the contact message first.
     *
     * The database remains the source of truth even if
     * notification email delivery fails.
     */
    const {
      data: contactMessage,
      error,
    } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone,
        message,
        status: "NEW",
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    /*
     * Build the email from the centralized template.
     *
     * The customer's email is used as Reply-To,
     * not as the sender.
     */
    const emailContent = renderContactMessage({
      name,
      email,
      phone,
      message,
      contactId: contactMessage.id,
    });

    /*
     * Send through the centralized PaintTheory
     * email service.
     */
    const emailResponse = await sendEmail({
      to: notificationEmail,
      replyTo: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    if (!emailResponse.success) {
      console.error(
        "CONTACT EMAIL ERROR:",
        emailResponse.error,
      );

      /*
       * The contact message is already safely stored.
       * Don't pretend the entire submission failed.
       */
      return new Response(
        JSON.stringify({
          success: true,
          messageId: contactMessage.id,
          notificationSent: false,
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

    return new Response(
      JSON.stringify({
        success: true,
        messageId: contactMessage.id,
        notificationSent: true,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(
      "SUBMIT CONTACT ERROR:",
      error,
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit your message.",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});