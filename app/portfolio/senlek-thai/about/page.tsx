import type { Metadata } from "next";
import Image from "next/image";

import { AnimatedCounter } from "../_components/AnimatedCounter";
import { PageTransition } from "../_components/PageTransition";
import { ScrollReveal } from "../_components/ScrollReveal";
import { SubpageHero } from "../_components/SubpageHero";
import { ThaiPattern } from "../_components/ThaiPattern";
import { restaurantInfo } from "../_data/restaurant-info";
import { buildSenlekMetadata } from "../_lib/metadata";
import { cn } from "../_lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  return buildSenlekMetadata({
    title: "Our Story | Senlek Thai Rice & Noodles — Hoover, Alabama",
    description:
      "Learn about Senlek Thai Rice & Noodles — owned by Nop Sac-Uang, bringing years of Thai culinary passion to Hoover, AL. House-made sauces, authentic recipes, warm hospitality.",
    path: "/about"
  });
}

export default function AboutPage() {
  return (
    <PageTransition>
      <SubpageHero
        eyebrow="Our Story"
        title="A restaurant built on tradition, craft, and care."
        description="Learn how Nop Sac-Uang brought the warmth of Thai street food to Hoover with house-made broths, vibrant flavors, and a welcoming dining room."
      />

      <section className="bg-[var(--senlek-cream)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-3xl text-base leading-8 text-[var(--senlek-warm-gray-500)] sm:text-lg">
              <p>{restaurantInfo.storyIntro}</p>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {restaurantInfo.stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.08}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  label={stat.label}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {restaurantInfo.storySections.map((section, index) => {
        const imageFirst = index % 2 === 1;

        return (
          <section
            key={section.id}
            className={cn(index % 2 === 0 ? "bg-white" : "bg-[var(--senlek-cream)]", "px-4 py-20 sm:px-6 lg:px-8")}
          >
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <ScrollReveal className={cn(imageFirst && "lg:order-2")} x={imageFirst ? 36 : -36}>
                  <div className="space-y-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--senlek-gold-600)]">
                      {section.overline}
                    </p>
                    <h2 className="font-display text-4xl font-bold leading-tight text-[var(--senlek-blue-900)] sm:text-5xl">
                      {section.title}
                    </h2>
                    <div className="space-y-5 text-base leading-8 text-[var(--senlek-warm-gray-500)]">
                      {section.copy.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal className={cn(imageFirst && "lg:order-1")} x={imageFirst ? -36 : 36}>
                  <div className="relative overflow-hidden rounded-[32px] bg-[var(--senlek-blue-50)] p-3 shadow-[0_24px_48px_rgba(26,35,126,0.1)]">
                    <Image
                      src={section.image}
                      alt={section.imageAlt}
                      width={1200}
                      height={900}
                      className="aspect-[4/3] w-full rounded-[24px] object-cover"
                      placeholder="empty"
                    />
                  </div>
                </ScrollReveal>
              </div>

              {index < restaurantInfo.storySections.length - 1 ? (
                <div className="mt-16 flex justify-center">
                  <ThaiPattern />
                </div>
              ) : null}
            </div>
          </section>
        );
      })}
    </PageTransition>
  );
}
