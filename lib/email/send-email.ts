import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: to,
    subject: subject,
    html: html,
    text: text,
  });
}
