import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";
import { Resend } from "npm:resend";

import { requestPaymentEmail } from "../_shared/email-templates/request-payment.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const resend = new Resend(
  Deno.env.get("RESEND_API_KEY")!,
);

function getPublicMediaUrl(path: string) {
  return supabase.storage
    .from("artworks")
    .getPublicUrl(path)
    .data.publicUrl;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function textToHtml(value: string) {
  return escapeHtml(value)
    .split("\n")
    .map((line) => line || "&nbsp;")
    .join("<br />");
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

        subject =
          "🎨 Your Artwork Has Been Reserved | PaintTheory by Kamlesh Sahoo";

        html = requestPaymentEmail({
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

        subject =
          `Payment ${payment.payment_number} - Your Commission | Painttheory by Kamlesh Sahoo`;

        const amount = `₹${Number(
          payment.amount,
        ).toLocaleString("en-IN")}`;

        html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>${escapeHtml(subject)}</title>
          </head>

          <body
            style="
              margin:0;
              padding:32px 12px;
              background:#f3efe7;
              color:#2b2823;
            "
          >
            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td align="center">

                  <table
                    role="presentation"
                    width="600"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      width:100%;
                      max-width:600px;
                      background:#fbf8f2;
                      border:1px solid #e7dfd2;
                      border-radius:18px;
                      overflow:hidden;
                    "
                  >

                    <tr>
                      <td
                        style="
                          padding:42px 44px 12px;
                          text-align:center;
                        "
                      >
                        <div
                          style="
                            font-family:Georgia,'Times New Roman',serif;
                            font-size:24px;
                            letter-spacing:6px;
                            text-transform:uppercase;
                            color:#1c1a17;
                          "
                        >
                          Kamlesh Sahoo
                        </div>

                        <div
                          style="
                            margin-top:8px;
                            font-family:Georgia,serif;
                            font-size:11px;
                            letter-spacing:3px;
                            text-transform:uppercase;
                            color:#9b8668;
                          "
                        >
                          Original Contemporary Art
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:0 44px;">
                        <div
                          style="
                            height:1px;
                            background:#e7dfd2;
                            margin:22px 0;
                          "
                        ></div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:0 44px 42px;
                          font-family:Georgia,serif;
                          color:#2b2823;
                          font-size:15px;
                          line-height:1.8;
                        "
                      >
                        <p>
                          Hi ${escapeHtml(
                            inquiry.customer_name,
                          )},
                        </p>

                        <p>
                          Thank you for continuing with your
                          commissioned artwork.
                        </p>

                        <p>
                          Your payment request is ready.
                        </p>

                        <div
                          style="
                            margin:28px 0;
                            padding:22px;
                            border:1px solid #e7dfd2;
                            border-radius:14px;
                            background:#f8f4ec;
                          "
                        >
                          <div
                            style="
                              font-size:11px;
                              letter-spacing:2px;
                              text-transform:uppercase;
                              color:#9b8668;
                            "
                          >
                            Payment ${payment.payment_number}
                          </div>

                          <div
                            style="
                              margin-top:8px;
                              font-family:Georgia,serif;
                              font-size:30px;
                              color:#1c1a17;
                            "
                          >
                            ${amount}
                          </div>
                        </div>

                        <p style="text-align:center;">
                          <a
                            href="${escapeHtml(
                              payment.customer_link,
                            )}"
                            style="
                              display:inline-block;
                              padding:14px 28px;
                              border-radius:999px;
                              background:#1c1a17;
                              color:#ffffff;
                              text-decoration:none;
                              font-family:Arial,sans-serif;
                              font-size:14px;
                            "
                          >
                            Complete Payment
                          </a>
                        </p>

                        ${
                          payment.is_final
                            ? `
                              <p style="margin-top:28px;">
                                This is the final payment for your
                                commission. After completing it,
                                you'll be asked to provide your
                                shipping address.
                              </p>
                            `
                            : ""
                        }

                        <p style="margin-top:28px;">
                          If you have any questions regarding this
                          payment, please feel free to get in touch.
                        </p>

                        <p>
                          Regards,<br />
                          Kamlesh Sahoo
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:0 44px;">
                        <div
                          style="
                            height:1px;
                            background:#e7dfd2;
                          "
                        ></div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:24px 44px 40px;
                          text-align:center;
                          font-family:Georgia,'Times New Roman',serif;
                        "
                      >
                        <div
                          style="
                            font-size:11px;
                            letter-spacing:2px;
                            text-transform:uppercase;
                            color:#b3a892;
                          "
                        >
                          PaintTheory | Kamlesh Sahoo
                        </div>
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>
          </body>
          </html>
        `;

        break;
      }

      /*
       * =====================================================
       * COMMISSION CONVERSATION
       * =====================================================
       */
      case "commission-conversation": {
        if (
          inquiry.inquiry_type !==
          "COMMISSION"
        ) {
          throw new Error(
            "This email template is only available for commission inquiries",
          );
        }

        if (!providedSubject?.trim()) {
          throw new Error(
            "Email subject is required",
          );
        }

        if (!providedBody?.trim()) {
          throw new Error(
            "Email body is required",
          );
        }

        subject =
          providedSubject.trim();

        html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>${escapeHtml(subject)}</title>
          </head>

          <body
            style="
              margin:0;
              padding:32px 12px;
              background:#f3efe7;
              color:#2b2823;
            "
          >
            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td align="center">

                  <table
                    role="presentation"
                    width="600"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      width:100%;
                      max-width:600px;
                      background:#fbf8f2;
                      border:1px solid #e7dfd2;
                      border-radius:18px;
                      overflow:hidden;
                    "
                  >

                    <tr>
                      <td
                        style="
                          padding:42px 44px 12px;
                          text-align:center;
                        "
                      >
                        <div
                          style="
                            font-family:Georgia,'Times New Roman',serif;
                            font-size:24px;
                            letter-spacing:6px;
                            text-transform:uppercase;
                            color:#1c1a17;
                          "
                        >
                          Kamlesh Sahoo
                        </div>

                        <div
                          style="
                            margin-top:8px;
                            font-family:Georgia,serif;
                            font-size:11px;
                            letter-spacing:3px;
                            text-transform:uppercase;
                            color:#9b8668;
                          "
                        >
                          Original Contemporary Art
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:0 44px;
                        "
                      >
                        <div
                          style="
                            height:1px;
                            background:#e7dfd2;
                            margin:22px 0;
                          "
                        ></div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:0 44px 42px;
                          font-family:Georgia,serif;
                          color:#2b2823;
                          font-size:15px;
                          line-height:1.8;
                        "
                      >
                        ${textToHtml(
                          providedBody.trim(),
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:0 44px;
                        "
                      >
                        <div
                          style="
                            height:1px;
                            background:#e7dfd2;
                          "
                        ></div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:24px 44px 40px;
                          text-align:center;
                          font-family:Georgia,'Times New Roman',serif;
                        "
                      >
                        <div
                          style="
                            font-size:11px;
                            letter-spacing:2px;
                            text-transform:uppercase;
                            color:#b3a892;
                          "
                        >
                          PaintTheory | Kamlesh Sahoo
                        </div>
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>
          </body>
          </html>
        `;

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
            "Content-Type":
              "application/json",
          },
        },
      );
    }

    /*
     * SEND
     */
    const {
      data,
      error: resendError,
    } = await resend.emails.send({
      from: Deno.env.get("FROM_EMAIL")!,
      to: [inquiry.customer_email],
      subject,
      html,
    });

    if (resendError) {
      throw resendError;
    }

    console.log(
      `Email sent successfully to ${inquiry.customer_email}`,
      data,
    );

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Email sent successfully",
        data,
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
          "Content-Type":
            "application/json",
        },
      },
    );
  }
});