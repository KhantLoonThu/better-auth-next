import VerificationEmail from "@/components/emails/verification-email";
import { Resend } from "resend";

type EmailProps = {
  to: string;
  verificationUrl: string;
  userName: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({
  to,
  verificationUrl,
  userName,
}: EmailProps) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: to,
    subject: "Welcome from Better-Auth-Next",
    react: (
      <VerificationEmail
        verificationUrl={verificationUrl}
        userName={userName}
      />
    ),
  });
}
