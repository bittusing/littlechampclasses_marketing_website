import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a Little Champ Classes account.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start with a trial class—we’ll help you pick the right program."
      footer={
        <>
          Creating an account means you accept our{" "}
          <Link href="/policies/terms" className="text-primary hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/policies/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
