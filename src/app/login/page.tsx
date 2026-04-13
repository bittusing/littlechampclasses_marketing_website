import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log in",
  description: "Access your Little Champ Classes account.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue your child’s learning journey."
      footer={
        <>
          By continuing you agree to our{" "}
          <Link href="/policies/terms" className="text-primary hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/policies/privacy" className="text-primary hover:underline">
            Privacy
          </Link>
          .
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
