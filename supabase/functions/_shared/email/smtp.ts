import nodemailer from "npm:nodemailer@9.0.6";

export function createTransporter() {
  const host = Deno.env.get("SMTP_HOST");
  const port = Number(Deno.env.get("SMTP_PORT") || "465");
  const user = Deno.env.get("SMTP_USER");
  const password = Deno.env.get("SMTP_PASSWORD");

  if (!host || !user || !password) {
    throw new Error("SMTP configuration is incomplete");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass: password,
    },
  });
}

export function getFromAddress(): string {
  const email = Deno.env.get("FROM_EMAIL");
  const name = Deno.env.get("EMAIL_FROM_NAME") || "PaintTheory";

  if (!email) {
    throw new Error("FROM_EMAIL is not configured");
  }

  return `"${name}" <${email}>`;
}