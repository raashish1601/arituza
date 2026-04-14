import type { Metadata } from "next";
import { CheckCircle2, Clock3, PartyPopper, Soup, Truck } from "lucide-react";

import { CateringPlanner } from "../_components/CateringPlanner";
import { PageTransition } from "../_components/PageTransition";
import { ScrollReveal } from "../_components/ScrollReveal";
import { SectionHeading } from "../_components/SectionHeading";
import { SubpageHero } from "../_components/SubpageHero";
import { Card, CardContent, CardHeader, CardTitle } from "../_components/ui/card";
import { cateringPackages, cateringSteps } from "../_data/experience";
import { buildSenlekMetadata } from "../_lib/metadata";

const icons = [PartyPopper, Soup, Truck];

export async function generateMetadata(): Promise<Metadata> {
  return buildSenlekMetadata({
    title: "Catering | Senlek Thai Rice & Noodles - Hoover, AL",
    description:
      "Plan office lunches, celebrations, and drop-off meals with Senlek Thai Rice & Noodles. Build a catering brief, explore service styles, and move from idea to pickup or delivery.",
    path: "/catering"
  });
}

export default function CateringPage() {
  return (
    <PageTransition>
      <SubpageHero
        eyebrow="Event Ready"
        title="Catering That Feels Thoughtful Before The Food Even Arrives"
        description="Give teams, family gatherings, and celebrations a smoother path from planning to pickup with a polished Senlek catering experience."
      />

      <section className="bg-[var(--senlek-cream)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CateringPlanner />
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Service Styles"
              title="Flexible formats for lunches, family-style spreads, and larger nights."
              description="The packages stay honest on pricing while giving guests enough structure to start the conversation prepared."
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {cateringPackages.map((item, index) => {
              const Icon = icons[index] ?? PartyPopper;

              return (
                <ScrollReveal key={item.id} delay={index * 0.08}>
                  <Card className="h-full rounded-[30px]">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--senlek-blue-50)] text-[var(--senlek-gold-600)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--senlek-gold-600)]">
                            {item.guestRange}
                          </p>
                          <CardTitle className="text-3xl">{item.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <p className="text-sm leading-7 text-[var(--senlek-warm-gray-500)]">{item.description}</p>
                      <div className="grid gap-3 rounded-[22px] bg-[var(--senlek-cream)] p-4 text-sm text-[var(--senlek-warm-gray-500)]">
                        <p>
                          <span className="font-semibold text-[var(--senlek-blue-900)]">Service style:</span> {item.serviceStyle}
                        </p>
                        <p>
                          <span className="font-semibold text-[var(--senlek-blue-900)]">Lead time:</span> {item.leadTime}
                        </p>
                        <p>
                          <span className="font-semibold text-[var(--senlek-blue-900)]">Ideal for:</span> {item.idealFor}
                        </p>
                      </div>
                      <div className="space-y-3">
                        {item.highlights.map((highlight) => (
                          <p key={`${item.id}-${highlight}`} className="flex items-center gap-3 text-sm text-[var(--senlek-blue-900)]">
                            <CheckCircle2 className="h-4 w-4 text-[var(--senlek-gold-600)]" />
                            {highlight}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--senlek-blue-900)] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="How It Works"
              title="A calmer planning flow from first idea to food on the table."
              description="The website now handles the early planning work, so the restaurant can spend less time extracting details and more time preparing the right order."
              centered
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {cateringSteps.map((step, index) => (
              <ScrollReveal key={step.id} delay={index * 0.08}>
                <article className="rounded-[28px] border border-white/10 bg-white/6 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--senlek-gold-300)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-bold">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/75">{step.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-5 py-3 text-sm text-white/78">
            <Clock3 className="h-4 w-4 text-[var(--senlek-gold-300)]" />
            The event flow is payment-ready and can accept a future secure deposit link without redesigning the page.
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
