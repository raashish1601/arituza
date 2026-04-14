import type { Metadata } from "next";
import { Flame, Heart, Sparkles, Star } from "lucide-react";

import { FlavorPassportPanel } from "../_components/FlavorPassportPanel";
import { PageTransition } from "../_components/PageTransition";
import { ScrollReveal } from "../_components/ScrollReveal";
import { SectionHeading } from "../_components/SectionHeading";
import { SubpageHero } from "../_components/SubpageHero";
import { rewardPerks } from "../_data/experience";
import { buildSenlekMetadata } from "../_lib/metadata";

const perkIcons = [Heart, Flame, Sparkles, Star];

export async function generateMetadata(): Promise<Metadata> {
  return buildSenlekMetadata({
    title: "Rewards | Senlek Thai Rice & Noodles - Hoover, AL",
    description:
      "Open the Senlek Flavor Passport to save favorite dishes, keep your order style organized, and power a smarter repeat-guest experience.",
    path: "/rewards"
  });
}

export default function RewardsPage() {
  return (
    <PageTransition>
      <SubpageHero
        eyebrow="Flavor Passport"
        title="A Repeat-Guest Experience That Starts Before Loyalty Goes Live"
        description="Senlek now has a retention layer for regulars: save favorite dishes, remember your flavor style, and build faster return visits without forcing account creation."
      />

      <section className="bg-[var(--senlek-cream)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FlavorPassportPanel />
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Retention Layer"
              title="The website now supports repeat behavior, not just first impressions."
              description="This is a practical bridge between a static restaurant site and a future loyalty stack. It improves reorders now and leaves room for Toast Loyalty or a custom VIP flow later."
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {rewardPerks.map((perk, index) => {
              const Icon = perkIcons[index] ?? Sparkles;

              return (
                <ScrollReveal key={perk.id} delay={index * 0.08}>
                  <article className="rounded-[28px] border border-[rgba(57,73,171,0.12)] bg-[var(--senlek-warm-white)] p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--senlek-blue-50)] text-[var(--senlek-gold-600)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-3xl font-bold text-[var(--senlek-blue-900)]">{perk.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--senlek-warm-gray-500)]">{perk.description}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
