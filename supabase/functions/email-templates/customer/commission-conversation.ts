interface CommissionConversationEmailProps {
  subject: string;
  body: string;
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

export function commissionConversationEmail({
  subject,
  body,
}: CommissionConversationEmailProps) {
  const cleanSubject = subject.trim();
  const cleanBody = body.trim();

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title>${escapeHtml(cleanSubject)}</title>
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
                  ${textToHtml(cleanBody)}
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

  const text = cleanBody;

  return {
    subject: cleanSubject,
    html,
    text,
  };
}