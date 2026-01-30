import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  verificationUrl: string;
  userName: string;
  appName?: string;
}

export const VerificationEmail = ({
  verificationUrl,
  userName,
  appName = "Better Auth Next",
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white font-koala">
        <Preview>Verify your email for {appName}</Preview>
        <Container className="mx-auto py-5 pb-12">
          <Text className="text-[16px] leading-[26px]">Hi {userName},</Text>
          <Text className="text-[16px] leading-[26px]">
            Welcome to Better Auth Next. Thank you for signing up for {appName}.
            Please confirm your email address by clicking the below button.
          </Text>
          <Section className="text-center">
            <Button
              className="bg-[#000000] text-white text-[16px] no-underline text-center block p-3"
              href={verificationUrl}
            >
              Verify your email
            </Button>
          </Section>

          <Hr className="border-[#cccccc] my-5" />
          <Text className="text-[#8898aa] text-[12px]">
            If you did not create your account, you can safely ignore email.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default VerificationEmail;
