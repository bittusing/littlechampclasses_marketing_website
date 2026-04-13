"use client";

import Image from "next/image";
import Link from "next/link";
import { useFeaturedCourses } from "@/hooks/useFeaturedCourses";

const BULLET_ICONS = ["📚", "📅", "👥", "✅"] as const;
const BULLET_BG = [
  "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-200",
  "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-200",
  "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-200",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200",
] as const;

export function FeaturedPrograms() {
  const { courses, loading, error, reload } = useFeaturedCourses();

  return (
    <section className="border-b border-border-soft bg-card/40 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Pick a learning program &amp; get started!
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted sm:text-lg">
            Choose from our best courses for your kid <span aria-hidden>⭐</span>
            <span className="sr-only">star</span>
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Data loads from the backend. Book a <strong className="text-primary">₹5</strong> demo on the sponsor
            page—no payment gateway yet.
          </p>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[520px] animate-pulse rounded-3xl bg-surface-subtle ring-1 ring-border-soft"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-border-soft bg-card p-6 text-center">
            <p className="text-foreground">{error}</p>
            <p className="mt-3 text-sm text-muted">
              If this says &quot;Course not found&quot;, restart the API after updating code, or check{" "}
              <code className="rounded bg-surface-subtle px-1">NEXT_PUBLIC_API_URL</code> matches your backend
              port.
            </p>
            <button
              type="button"
              className="mt-4 text-sm font-bold text-primary"
              onClick={() => void reload()}
            >
              Retry
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-dashed border-border-soft bg-surface-subtle/50 p-8 text-center">
            <p className="font-medium text-foreground">No courses returned for the homepage strip.</p>
            <p className="mt-2 text-sm text-muted">
              Seed MongoDB from the repo root:{" "}
              <code className="rounded bg-card px-1 py-0.5 text-xs">npm run seed</code>
              <br />
              Ensure MongoDB is running and the API is up (e.g. port 4100).
            </p>
            <button
              type="button"
              className="mt-4 text-sm font-bold text-primary"
              onClick={() => void reload()}
            >
              Retry
            </button>
          </div>
        ) : (
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {courses.map((c) => {
              const thumb = c.thumbnailUrl?.trim() || "/courses/thumb-stories.svg";
              const rawBullets = Array.isArray(c.marketingBullets) ? c.marketingBullets : [];
              let lines = rawBullets.map((b) => String(b).trim()).filter(Boolean).slice(0, 4);
              if (lines.length === 0) {
                const a = c.liveSessionsFirst ?? 6;
                const b = c.liveSessionsSecond ?? 6;
                lines = [
                  `Program: ${a} + ${b} live sessions (${a + b} classes)`,
                  `Demo booking: ₹${c.priceRupees ?? 5}`,
                  "Small groups · IIT-trained mentors",
                  "Ages 1–8 · paced batches",
                ];
              }
              const title = (c.marketingTitle ?? c.title ?? "Course").trim();
              return (
                <li
                  key={c.id}
                  className="flex flex-col overflow-hidden rounded-3xl border border-border-soft bg-card shadow-[0_20px_50px_-24px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] bg-surface-subtle">
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={thumb.endsWith(".svg")}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{c.description}</p>
                    <ul className="mt-5 flex flex-1 flex-col gap-3">
                      {lines.slice(0, 4).map((line, i) => (
                        <li key={i} className="flex gap-3 text-sm text-foreground/90">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base ${BULLET_BG[i % 4]}`}
                            aria-hidden
                          >
                            {BULLET_ICONS[i % 4]}
                          </span>
                          <span className="pt-1 leading-snug">{line}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/sponsor#program-${c.slug}`}
                      className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-primary text-center text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-95"
                    >
                      Book a Demo · ₹{c.priceRupees}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
