import { redirectIfAuthenticated } from "@/utils/auth";
import { SignInForm } from "@/components/sign-in";

export default async function SignInPage() {
  await redirectIfAuthenticated();

  return <SignInForm />;
}
