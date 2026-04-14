import type { Metadata } from "next";
import { ArrowRight, Gift, HeartHandshake, PartyPopper, Smartphone } from "lucide-react";

import { PageTransition } from "../_components/PageTransition";
import { ScrollReveal } from "../_components/ScrollReveal";
import { SectionHeading } from "../_components/SectionHeading";
import { SubpageHero } from "../_components/SubpageHero";
import { Button } from "../_components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../_components/ui/card";
import { giftOptions } from "../_data/experience";
import { restaurantInfo } from "../_data/restaurant-info";
import { buildSenlekMetadata } from "../_lib/metadata";

const giftMoments = [
  {
    icon: PartyPopper,
    title: "Birthdays and small celebrations",
    description: "A fast, polished fallback when you want the gift to feel special without overcomplicating the purchase."
  },
  {
    icon: HeartHandshake,
    title: "Thank-yous and thoughtful surprises",
    description: "Great for clients, neighbors, coworkers, and anyone who deserves a night of real comfort food."
  },
  {
    icon: Smartphone,
    title: "Last-minute digital wins",
    description: "The mobile-first flow works well when you need to send something good quickly."
  }
];

export async function generateMetadata(): Promise<Metadata> {
  return buildSenlekMetadata({
    title: "Gift Cards | Senlek Thai Rice & Noodles - Hoover, AL",
    description:
      "Send a flexible Senlek Thai Rice & Noodles dining gift for birthdays, thank-yous, and special nights out. Explore digital gift options and polished gifting UX.",
    path: "/gift-cards"
  });
}

export default function GiftCardsPage() {
  return (
    <PageTransition>
      <SubpageHero
        eyebrow="Gift Better"
        title="A Dinner Out, A Thai Tea Break, Or A Last-Minute Win"
        description="Senlek now has a dedicated gifting page that feels polished, intentional, and mobile friendly instead of hiding the option inside generic ordering links."
      />

      <section className="bg-[var(--senlek-cream)] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Gift Options"
              title="Three easy starting points for flexible digital gifting."
              description="These options use a flexible third-party gift flow, so they work today without claiming an in-house gift card program that the restaurant has not published."
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {giftOptions.map((option, index) => (
              <ScrollReveal key={option.id} delay={index * 0.08}>
                <Card className="h-full rounded-[30px]">
                  <CardHeader>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--senlek-blue-50)] text-[var(--senlek-gold-600)]">
                      <Gift className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--senlek-gold-600)]">
                      {option.amount}
                    </p>
                    <CardTitle className="text-3xl">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-full flex-col">
                    <p className="text-sm leading-7 text-[var(--senlek-warm-gray-500)]">{option.description}</p>
                    <p className="mt-4 text-sm leading-7 text-[var(--senlek-blue-900)]">{option.helper}</p>
                    <div className="mt-auto pt-6">
                      <Button asChild className="w-full">
                        <a href={option.href} target="_blank" rel="noreferrer">
                          Send This Gift
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Moments"
              title="Built for everyday gifting, not just holidays."
              description={
                "A strong restaurant gifting experience catches birthdays, thank-yous, moving gifts, and the classic 'I know you love Thai food' moment."
              }
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {giftMoments.map((moment, index) => {
              const Icon = moment.icon;

              return (
                <ScrollReveal key={moment.title} delay={index * 0.08}>
                  <article className="rounded-[28px] border border-[rgba(57,73,171,0.12)] bg-[var(--senlek-warm-white)] p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--senlek-blue-50)] text-[var(--senlek-gold-600)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-3xl font-bold text-[var(--senlek-blue-900)]">{moment.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--senlek-warm-gray-500)]">{moment.description}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.18}>
            <div className="mt-12 rounded-[32px] bg-[linear-gradient(135deg,var(--senlek-blue-900),var(--senlek-blue-700))] p-8 text-white shadow-[0_24px_60px_rgba(26,35,126,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--senlek-gold-300)]">
                Transparent note
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-white/78">
                The current gift flow is a flexible third-party dining gift, not an official merchant-issued Senlek house card. That keeps the page honest while still giving the restaurant a polished gifting experience right now.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a href={restaurantInfo.giftCardLink} target="_blank" rel="noreferrer">
                    Open Gift Flow
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={restaurantInfo.phoneHref}>Call The Restaurant</a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
