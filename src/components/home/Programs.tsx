import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";

const bands = [
  {
    title: "Classes 1–3",
    subtitle: "Foundations through play",
    points: ["Sensory & language sparks", "Parent-partnered routines", "Short, lively sessions"],
  },
  {
    title: "Classes 4–5",
    subtitle: "Pre-primary readiness",
    points: ["Early numeracy & patterns", "Stories & expression", "Focus without fatigue"],
  },
  {
    title: "Classes 6–8",
    subtitle: "Growing independence",
    points: ["Core concepts with context", "Problem-solving habits", "Confidence in class"],
  },
];

export function Programs() {
  return (
    <Section id="programs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Programs by age
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Pick the band that matches your child—we tailor pacing, examples, and homework to their
            world.
          </p>
        </div>
        <ButtonLink href="/sponsor" variant="secondary" className="shrink-0 self-start sm:self-auto">
          Book ₹5 demo
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {bands.map((b) => (
          <article
            key={b.title}
            className="flex flex-col rounded-2xl border border-foreground/10 bg-card p-6 shadow-sm"
          >
            <h3 className="font-display text-xl font-bold text-foreground">{b.title}</h3>
            <p className="mt-1 text-sm font-medium text-primary">{b.subtitle}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
              {b.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-primary" aria-hidden>
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
