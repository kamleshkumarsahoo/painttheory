interface PurchaseRequestNotificationProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  country: string;
  artworkTitle: string;
  artworkPrice: string;
  referenceNumber: string;
  note: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function purchaseRequestNotification({
  customerName,
  customerEmail,
  customerPhone,
  country,
  artworkTitle,
  artworkPrice,
  referenceNumber,
  note,
}: PurchaseRequestNotificationProps) {
  const subject =
    `🛒 New Purchase Request | ${referenceNumber}`;

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
                    PaintTheory
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
                    New Purchase Request
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
                    A new purchase request has been received.
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
                      Request Reference
                    </div>

                    <div
                      style="
                        margin-top:8px;
                        font-family:Georgia,serif;
                        font-size:22px;
                        color:#1c1a17;
                      "
                    >
                      ${escapeHtml(referenceNumber)}
                    </div>
                  </div>

                  <p>
                    <strong>Artwork</strong><br />
                    ${escapeHtml(artworkTitle)}
                  </p>

                  <p>
                    <strong>Price</strong><br />
                    ${escapeHtml(artworkPrice)}
                  </p>

                  <div
                    style="
                      height:1px;
                      background:#e7dfd2;
                      margin:28px 0;
                    "
                  ></div>

                  <p>
                    <strong>Customer</strong><br />
                    ${escapeHtml(customerName)}
                  </p>

                  <p>
                    <strong>Email</strong><br />
                    ${escapeHtml(customerEmail)}
                  </p>

                  <p>
                    <strong>Phone</strong><br />
                    ${escapeHtml(customerPhone)}
                  </p>

                  <p>
                    <strong>Country</strong><br />
                    ${escapeHtml(country)}
                  </p>

                  ${
                    note
                      ? `
                        <p>
                          <strong>Customer Note</strong><br />
                          ${escapeHtml(note).replace(
                            /\n/g,
                            "<br />",
                          )}
                        </p>
                      `
                      : ""
                  }

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
New Purchase Request

Reference: ${referenceNumber}

Artwork: ${artworkTitle}
Price: ${artworkPrice}

Customer:
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Country: ${country}

${note ? `Customer Note:\n${note}\n` : ""}
`;

  return {
    subject,
    html,
    text,
  };
}