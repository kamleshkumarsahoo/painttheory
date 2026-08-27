import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const fromEmail = Deno.env.get("FROM_EMAIL")!;
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
     * Send notification email.
     *
     * The customer's email is used as Reply-To,
     * not as the sender.
     */
    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [notificationEmail],
          reply_to: email,
          subject: `New contact message from ${name}`,
          html: `
            <!DOCTYPE html>
            <html>
              <body
                style="
                  margin: 0;
                  padding: 32px 16px;
                  background: #f3efe7;
                  color: #2b2823;
                  font-family: Arial, sans-serif;
                "
              >
                <div
                  style="
                    max-width: 600px;
                    margin: 0 auto;
                    background: #fbf8f2;
                    border: 1px solid #e7dfd2;
                    border-radius: 16px;
                    padding: 32px;
                  "
                >
                  <div
                    style="
                      text-align: center;
                      margin-bottom: 28px;
                    "
                  >
                    <div
                      style="
                        font-family: Georgia, serif;
                        font-size: 22px;
                        letter-spacing: 4px;
                        text-transform: uppercase;
                      "
                    >
                      Kamlesh Sahoo
                    </div>

                    <div
                      style="
                        margin-top: 8px;
                        font-size: 10px;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                        color: #9b8668;
                      "
                    >
                      New Contact Message
                    </div>
                  </div>

                  <div
                    style="
                      border-top: 1px solid #e7dfd2;
                      padding-top: 24px;
                    "
                  >
                    <p>
                      <strong>Name</strong><br />
                      ${escapeHtml(name)}
                    </p>

                    <p>
                      <strong>Email</strong><br />
                      ${escapeHtml(email)}
                    </p>

                    ${
                      phone
                        ? `
                          <p>
                            <strong>Phone</strong><br />
                            ${escapeHtml(phone)}
                          </p>
                        `
                        : ""
                    }

                    <div
                      style="
                        margin-top: 24px;
                        padding: 20px;
                        background: #f8f4ec;
                        border: 1px solid #e7dfd2;
                        border-radius: 12px;
                      "
                    >
                      <p
                        style="
                          margin-top: 0;
                          font-weight: 600;
                        "
                      >
                        Message
                      </p>

                      <p
                        style="
                          margin-bottom: 0;
                          white-space: pre-wrap;
                          line-height: 1.7;
                        "
                      >
                        ${escapeHtml(message)}
                      </p>
                    </div>

                    <p
                      style="
                        margin-top: 28px;
                        font-size: 12px;
                        color: #777;
                      "
                    >
                      Message ID:
                      ${escapeHtml(contactMessage.id)}
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
        }),
      },
    );

    if (!emailResponse.ok) {
      const errorBody =
        await emailResponse.text();

      console.error(
        "RESEND CONTACT EMAIL ERROR:",
        errorBody,
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}