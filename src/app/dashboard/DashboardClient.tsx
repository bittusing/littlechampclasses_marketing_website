"use client";

import Image from "next/image";
import Link from "next/link";
import { useBookDemoFlow } from "@/providers/BookDemoFlowProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useMyBookings } from "@/hooks/useMyBookings";
import { toYouTubeEmbed } from "@/lib/video";
import { VideoEngagementBar } from "@/components/video/VideoEngagementBar";

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
  const { user, token, loading: authLoading, logout } = useAuth();
  const { openPicker } = useBookDemoFlow();
  const { bookings, loading, error, reload } = useMyBookings(token);

  if (authLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center text-muted sm:px-6">
        Loading your profile…
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
            Signed in as <span className="font-semibold text-foreground">{user.name}</span> ({user.email})
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
              My learning
            </h2>
            <p className="mt-1 text-sm text-muted">
              Preview player with Like / Subscribe strip (demo). Data comes from your MongoDB bookings + courses.
            </p>
            <ul className="mt-6 space-y-8">
              {bookings.length === 0 ? (
                <li className="rounded-2xl border border-dashed border-border-soft bg-card/60 p-8 text-center text-sm text-muted backdrop-blur-sm">
                  No bookings yet.{" "}
                  <button
                    type="button"
                    onClick={() => openPicker()}
                    className="font-bold text-primary underline-offset-2 hover:underline"
                  >
                    Browse demo courses
                  </button>
                  .
                </li>
              ) : (
                bookings.map((b) => {
                  const embed =
                    b.course?.previewVideoUrl && toYouTubeEmbed(b.course.previewVideoUrl);
                  const thumb =
                    b.course?.thumbnailUrl?.trim() || FALLBACK_THUMB;
                  return (
                    <li
                      key={b.id}
                      className="overflow-hidden rounded-2xl border border-border-soft bg-card shadow-lg ring-1 ring-black/5"
                    >
                      <div className="border-b border-border-soft bg-surface-subtle/90 px-4 py-3">
                        <p className="font-display font-bold text-foreground">
                          {b.course?.title ?? "Course"}
                        </p>
                        <p className="text-xs text-muted">
                          Booked {formatWhen(b.createdAt)} · ₹{b.amountRupees} · {b.status}
                          {b.course
                            ? ` · Program: ${b.course.totalLiveSessions} classes (${b.course.liveSessionsFirst}+${b.course.liveSessionsSecond})`
                            : ""}
                        </p>
                      </div>
                      <div className="relative aspect-video bg-zinc-950">
                        {embed ? (
                          <iframe
                            title={`Preview: ${b.course?.title}`}
                            src={embed}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="relative h-full w-full">
                            <Image
                              src={thumb}
                              alt=""
                              fill
                              className="object-cover opacity-90"
                              unoptimized={thumb.endsWith(".svg")}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/45 p-6 text-center">
                              <span className="text-4xl" aria-hidden>
                                ▶️
                              </span>
                              <p className="max-w-xs text-sm font-medium text-white">
                                Add a YouTube link to <code className="rounded bg-black/40 px-1">previewVideoUrl</code>{" "}
                                on this course in MongoDB to show video here.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <VideoEngagementBar channelName="Little Champ Junior" />
                      {b.course?.classStartsAt ? (
                        <p className="border-t border-border-soft bg-surface-subtle/50 px-4 py-2 text-xs text-muted">
                          Scheduled window: {formatWhen(b.course.classStartsAt)}
                        </p>
                      ) : null}
                    </li>
                  );
                })
              )}
            </ul>
          </section>

          <section aria-labelledby="ledger-heading" className="lg:border-l lg:border-border-soft lg:pl-12">
            <h2 id="ledger-heading" className="font-display text-xl font-bold text-foreground">
              Booking history
            </h2>
            <p className="mt-1 text-sm text-muted">
              Ledger-style list for reporting. Export to your BI tool from MongoDB when you scale.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border-soft bg-card shadow-sm">
              <table className="w-full min-w-[320px] text-left text-sm">
                <thead className="bg-surface-subtle text-xs font-bold uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">When</th>
                    <th className="px-4 py-3">Ref</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted">
                        No rows yet.
                      </td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b.id} className="border-t border-border-soft">
                        <td className="px-4 py-3 font-medium text-foreground">
                          {b.course?.title ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-muted">₹{b.amountRupees}</td>
                        <td className="px-4 py-3 text-muted">{formatWhen(b.createdAt)}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted">{b.paymentRef}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
