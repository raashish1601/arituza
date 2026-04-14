import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { guestExperienceCards } from "../_data/experience";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

export function GuestExperienceSection() {
  return (
    <section className="bg-[var(--senlek-warm-white)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Built To Convert"
            title="Three polished guest journeys beyond the standard restaurant site."
            description="Senlek now has dedicated paths for event planning, gifting, and repeat-guest retention so the website does more than just look good."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {guestExperienceCards.map((card, index) => (
            <ScrollReveal key={card.id} delay={index * 0.08}>
              <article className="group flex h-full flex-col rounded-[32px] border border-[rgba(57,73,171,0.12)] bg-white p-7 shadow-[0_18px_40px_rgba(26,35,126,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(26,35,126,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--senlek-gold-600)]">
                  {card.eyebrow}
                </p>
                <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-[var(--senlek-blue-900)]">
                  {card.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-[var(--senlek-warm-gray-500)]">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.06em] text-[var(--senlek-blue-900)] transition hover:text-[var(--senlek-gold-600)]"
                >
                  {card.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
