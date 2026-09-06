import { sendEmail } from "../_shared/email/service.ts";

Deno.serve(async () => {
  try {
    const result = await sendEmail({
      to: "hello@painttheory.in",
      subject: "PaintTheory — Central Email Service Test",
      text: "This email was sent through the centralized PaintTheory email service using GoDaddy SMTP.",
      html: `
        <h2>PaintTheory — Central Email Service Test</h2>
        <p>
          If you received this email, the centralized PaintTheory
          email service is working correctly.
        </p>
      `,
    });

    if (!result.success) {
      return new Response(
        JSON.stringify(result),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Email service test failed:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
});