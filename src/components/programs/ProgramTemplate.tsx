import Link from "next/link";
import { Section } from "@/components/layout/Section";

type ProgramTemplateProps = {
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
};

export function ProgramTemplate({ title, eyebrow, description, bullets }: ProgramTemplateProps) {
  return (
    <Section className="py-12 sm:py-16">
      <p className="text-sm font-bold uppercase tracking-wide text-primary">{eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
      <ul className="mt-8 max-w-xl space-y-3 text-foreground">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span className="text-primary" aria-hidden>
              ✓
            </span>
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/sponsor"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground"
        >
          View demo on sponsor page
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-primary px-6 text-sm font-bold text-primary"
        >
          Back to home
        </Link>
      </div>
    </Section>
  );
}
