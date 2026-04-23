"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { VideoEngagementBar } from "@/components/video/VideoEngagementBar";
import { useMyBookings } from "@/hooks/useMyBookings";
import { formatIndianMobileDisplay } from "@/lib/phoneDisplay";
import { toYouTubeEmbed } from "@/lib/video";
import { useAuth } from "@/providers/AuthProvider";
import { useBookDemoFlow } from "@/providers/BookDemoFlowProvider";

function formatWhen(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

const FALLBACK_THUMB = "/courses/thumb-stories.svg";

export function DashboardClient() {
  const router = useRouter();
  const { user, token, loading: authLoading, logout } = useAuth();
  const { openPicker } = useBookDemoFlow();
  const { bookings, loading, error, reload } = useMyBookings(token);

  useEffect(() => {
    if (authLoading) return;
    if (user && !user.profileComplete) {
      router.replace("/onboarding");
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center text-muted sm:px-6">
        Loading your profile…
      </div>
    );
  }

  if (user && !user.profileComplete) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center text-muted sm:px-6">
        Redirecting to complete your profile…
      </div>
    );
  }

  if (!user || !token) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-3 text-muted">Sign in to see your booked demo classes and videos.</p>
        <Link
          href="/login"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-primary px-6 font-bold text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Login / Register
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col justify-between gap-4 border-b border-border-soft pb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted">
            Signed in as{" "}
            {user.childName ? (
              <span className="font-semibold text-foreground">{user.childName}&apos;s parent</span>
            ) : (
              <span className="font-semibold text-foreground">Learner</span>
            )}{" "}
            · {formatIndianMobileDisplay(user.phoneNational10)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => openPicker()}
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20"
          >
            Book another demo
          </button>
          <button
            type="button"
            className="rounded-xl border border-border-soft px-4 py-2 text-sm font-semibold text-muted hover:text-foreground"
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-10 text-muted">Loading your classes…</p>
      ) : error ? (
        <div className="mt-10 rounded-2xl border border-border-soft bg-card p-6">
          <p className="text-foreground">{error}</p>
          <button
            type="button"
            className="mt-4 text-sm font-bold text-primary"
            onClick={() => void reload()}
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <section aria-labelledby="learning-heading">
            <h2 id="learning-heading" className="font-display text-xl font-bold text-foreground">
              Your booked demo classes
            </h2>
            <p className="mt-1 text-sm text-muted">Everything you’ve booked so far, in one place.</p>

            <div className="mt-6 space-y-4">
              {bookings.length === 0 ? (
                <div className="rounded-2xl border border-border-soft bg-card p-6">
                  <p className="text-sm text-muted">No demo classes yet.</p>
                  <button
                    type="button"
                    onClick={() => openPicker()}
                    className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20"
                  >
                    Book a demo (₹9)
                  </button>
                </div>
              ) : (
                bookings.map((b) => (
                  <div key={b.id} className="overflow-hidden rounded-2xl border border-border-soft bg-card">
                    <div className="relative h-40 w-full bg-foreground/5">
                      <Image
                        src={b.course?.thumbnailUrl?.trim() || FALLBACK_THUMB}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 520px"
                        unoptimized={(b.course?.thumbnailUrl || "").endsWith(".svg")}
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-sm font-bold text-foreground">{b.course?.title || "Demo class"}</p>
                      <p className="mt-1 text-xs text-muted">Booked: {formatWhen(b.createdAt ?? null)}</p>
                      <p className="mt-3 text-xs text-muted">Status: {b.status}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section aria-labelledby="videos-heading">
            <h2 id="videos-heading" className="font-display text-xl font-bold text-foreground">
              Videos
            </h2>
            <p className="mt-1 text-sm text-muted">Curated previews to keep your child engaged.</p>
            <div className="mt-6 rounded-2xl border border-border-soft bg-card p-6">
              <VideoEngagementBar />
              <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-foreground/5">
                {/*
                  Fallback to undefined because <iframe src> doesn't accept null.
                */}
                <iframe
                  title="Preview"
                  src={toYouTubeEmbed("https://www.youtube.com/watch?v=dQw4w9WgXcQ") ?? undefined}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-xs text-muted">
                More videos will appear here as you book classes and explore programs.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

