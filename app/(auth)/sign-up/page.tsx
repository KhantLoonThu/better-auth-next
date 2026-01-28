import { redirectIfAuthenticated } from "@/utils/auth";
import { SignUpForm } from "@/components/sign-up";

export default async function SignUpPage() {
  await redirectIfAuthenticated();

  return <SignUpForm />;
}
