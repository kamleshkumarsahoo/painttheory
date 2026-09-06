interface CommissionPaymentEmailProps {
  customerName: string;
  paymentNumber: number | string;
  amount: string;
  customerLink: string;
  isFinal: boolean;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function commissionPaymentEmail({
  customerName,
  paymentNumber,
  amount,
  customerLink,
  isFinal,
}: CommissionPaymentEmailProps) {
  const subject =
    `Payment ${paymentNumber} - Your Commission | Painttheory by Kamlesh Sahoo`;

  const html = `
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
                    Hi ${escapeHtml(customerName)},
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
                      Payment ${escapeHtml(String(paymentNumber))}
                    </div>

                    <div
                      style="
                        margin-top:8px;
                        font-family:Georgia,serif;
                        font-size:30px;
                        color:#1c1a17;
                      "
                    >
                      ${escapeHtml(amount)}
                    </div>
                  </div>

                  <p style="text-align:center;">
                    <a
                      href="${escapeHtml(customerLink)}"
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
                    isFinal
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

  const text = `
Hi ${customerName},

Thank you for continuing with your commissioned artwork.

Your payment request is ready.

Payment ${paymentNumber}
Amount: ${amount}

Complete Payment:
${customerLink}

${
  isFinal
    ? "This is the final payment for your commission. After completing it, you'll be asked to provide your shipping address."
    : ""
}

If you have any questions regarding this payment, please feel free to get in touch.

Regards,
Kamlesh Sahoo
`;

  return {
    subject,
    html,
    text,
  };
}