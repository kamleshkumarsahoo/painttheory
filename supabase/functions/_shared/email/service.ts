import { createTransporter, getFromAddress } from "./smtp.ts";
import type { SendEmailOptions, SendEmailResult } from "./types.ts";

export async function sendEmail(
  options: SendEmailOptions,
): Promise<SendEmailResult> {
  try {
    const transporter = createTransporter();

    const result = await transporter.sendMail({
      from: getFromAddress(),
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Email sending failed:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}