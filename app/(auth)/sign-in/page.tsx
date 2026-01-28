import { redirectIfAuthenticated } from "@/utils/auth";

export default async function SignInPage() {
  await redirectIfAuthenticated();

  return <div></div>;
}
