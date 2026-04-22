"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ApiError } from "@/lib/api/types";
import { useAuth } from "@/providers/AuthProvider";
import { useBookDemoFlow } from "@/providers/BookDemoFlowProvider";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { openPicker } = useBookDemoFlow();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not log in");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-border-soft bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-border-soft bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {error ? (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      ) : null}
      <Button type="submit" variant="primary" className="w-full min-h-12 text-base" disabled={submitting}>
        {submitting ? "Signing in…" : "Log in"}
      </Button>
      <p className="text-center text-xs text-muted">
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          New here? Create an account
        </Link>
        {" · "}
        <button type="button" onClick={() => openPicker()} className="text-primary hover:underline">
          Demo classes
        </button>
      </p>
    </form>
  );
}
