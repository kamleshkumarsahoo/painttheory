interface FeedbackNotificationProps {
  name: string;
  message: string;
  allowPublish: boolean;
  createdAt: string;
}

export function feedbackNotification(
  props: FeedbackNotificationProps,
) {
  const {
    name,
    message,
    allowPublish,
    createdAt,
  } = props;

  const subject = `⭐ New Customer Feedback`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#222;">
      <h2>New Customer Feedback</h2>

      <hr />

      <p><strong>Name:</strong> ${name || "Anonymous"}</p>

      <p><strong>Submitted:</strong> ${createdAt}</p>

      <p>
        <strong>Permission to publish:</strong>
        ${allowPublish ? "Yes" : "No"}
      </p>

      <h3>Feedback</h3>

      <div style="
        background:#f7f7f7;
        padding:16px;
        border-radius:8px;
        white-space:pre-wrap;
      ">
        ${message}
      </div>

      <hr />

      <p style="color:#777;font-size:12px;">
        PaintTheory
      </p>
    </div>
  `;

  const text = `
New Customer Feedback

Name: ${name || "Anonymous"}
Submitted: ${createdAt}
Permission to publish: ${allowPublish ? "Yes" : "No"}

Feedback:
${message}

PaintTheory
  `.trim();

  return {
    subject,
    html,
    text,
  };
}