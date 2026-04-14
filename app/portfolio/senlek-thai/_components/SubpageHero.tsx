import { ScrollReveal } from "./ScrollReveal";
import { ThaiPattern } from "./ThaiPattern";

interface SubpageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SubpageHero({ eyebrow, title, description }: SubpageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--senlek-blue-900),var(--senlek-blue-700))] px-4 pb-16 pt-24 text-white sm:px-6 sm:pt-28 lg:px-8">
      <div className="absolute left-4 top-16 opacity-80">
        <ThaiPattern variant="swirl" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-80">
        <ThaiPattern variant="lotus" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(240,199,94,0.16),transparent_38%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[var(--senlek-gold-300)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-tight sm:text-6xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--senlek-warm-gray-200)] sm:text-lg">
            {description}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
