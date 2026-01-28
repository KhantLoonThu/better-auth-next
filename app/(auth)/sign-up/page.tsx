import { redirectIfAuthenticated } from "@/utils/auth";

export default async function SignUpPage() {
  await redirectIfAuthenticated();

  return <div></div>;
}
