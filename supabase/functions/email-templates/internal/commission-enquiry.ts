interface CommissionEnquiryNotificationProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  country: string;
  budget: string;
  deadline: string;
  note: string;
  referenceNumber: string;
}

export function commissionEnquiryNotification(
  props: CommissionEnquiryNotificationProps,
) {
  const {
    customerName,
    customerEmail,
    customerPhone,
    country,
    budget,
    deadline,
    note,
    referenceNumber,
  } = props;

  const subject = `🎨 New Commission Enquiry | ${referenceNumber}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#222;">
      <h2>New Commission Enquiry</h2>

      <p>A new commission enquiry has been submitted on PaintTheory.</p>

      <hr />

      <h3>Customer</h3>
      <p><strong>Name:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Phone:</strong> ${customerPhone}</p>
      <p><strong>Country:</strong> ${country || "Not specified"}</p>

      <h3>Commission Details</h3>
      <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
      <p><strong>Deadline:</strong> ${deadline || "Not specified"}</p>

      <h3>Message</h3>
      <p>${note || "No additional details provided."}</p>

      <hr />

      <p><strong>Reference:</strong> ${referenceNumber}</p>

      <p style="color:#777;font-size:12px;">
        PaintTheory
      </p>
    </div>
  `;

  const text = `
New Commission Enquiry | ${referenceNumber}

Customer
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Country: ${country || "Not specified"}

Commission Details
Budget: ${budget || "Not specified"}
Deadline: ${deadline || "Not specified"}

Message
${note || "No additional details provided."}

Reference: ${referenceNumber}

PaintTheory
  `.trim();

  return { subject, html, text };
}