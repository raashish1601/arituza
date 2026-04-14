import type { Metadata } from "next";
import { Camera, MapPin, Phone, ShoppingBag, Store, Truck, Users } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../_components/ui/accordion";
import { Button } from "../_components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../_components/ui/card";
import { PageTransition } from "../_components/PageTransition";
import { ScrollReveal } from "../_components/ScrollReveal";
import { SectionHeading } from "../_components/SectionHeading";
import { SubpageHero } from "../_components/SubpageHero";
import { businessHours } from "../_data/hours";
import { restaurantInfo } from "../_data/restaurant-info";
import { buildSenlekMetadata } from "../_lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildSenlekMetadata({
    title: "Contact & Hours | Senlek Thai Rice & Noodles — Hoover, AL",
    description:
      "Visit Senlek Thai Rice & Noodles at 1843 Montgomery Hwy, Suite 107, Hoover, AL 35244. Open Mon–Sat. Call (205) 937-8099 or order online.",
    path: "/contact"
  });
}

export default function ContactPage() {
  return (
    <PageTransition>
      <SubpageHero
        eyebrow="Visit & Order"
        title="Contact & Hours"
        description="Visit Senlek Thai Rice & Noodles in Hoover, call ahead, or order online for pickup and delivery."
      />

      <section className="bg-[var(--senlek-cream)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[var(--senlek-gold-600)]" />
                    Address
                  </CardTitle>
                  <CardDescription>{restaurantInfo.shoppingCenter}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base leading-8 text-[var(--senlek-warm-gray-500)]">
                    {restaurantInfo.addressLine1}
                    <br />
                    {restaurantInfo.addressLine2}
                  </p>
                  <Button asChild>
                    <a href={restaurantInfo.mapsLink} target="_blank" rel="noreferrer">
                      Get Directions
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[var(--senlek-gold-600)]" />
                    Phone
                  </CardTitle>
                  <CardDescription>Call for pickup, questions, or large party planning.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a href={restaurantInfo.phoneHref} className="text-lg font-semibold text-[var(--senlek-blue-900)]">
                    {restaurantInfo.phoneDisplay}
                  </a>
                  <Button asChild variant="outline">
                    <a href={restaurantInfo.phoneHref}>Call Now</a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Hours</CardTitle>
                  <CardDescription>Open Monday through Saturday.</CardDescription>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm text-[var(--senlek-warm-gray-500)]">
                    <tbody>
                      {businessHours.map((hour) => (
                        <tr key={hour.day}>
                          <td className="py-2 pr-4 font-medium text-[var(--senlek-blue-900)]">{hour.day}</td>
                          <td>{hour.display}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <Card>
                <CardHeader>
                  <CardTitle>Online Ordering</CardTitle>
                  <CardDescription>Choose pickup or delivery from your preferred platform.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <Button asChild>
                    <a href={restaurantInfo.toast} target="_blank" rel="noreferrer">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Toast
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={restaurantInfo.doorDash} target="_blank" rel="noreferrer">
                      <Truck className="mr-2 h-4 w-4" />
                      DoorDash
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={restaurantInfo.uberEats} target="_blank" rel="noreferrer">
                      <Store className="mr-2 h-4 w-4" />
                      Uber Eats
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Follow along for updates, specials, and new favorites.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button asChild variant="outline">
                    <a href={restaurantInfo.instagram} target="_blank" rel="noreferrer">
                      <Camera className="mr-2 h-4 w-4" />
                      Instagram
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={restaurantInfo.facebook} target="_blank" rel="noreferrer">
                      <Users className="mr-2 h-4 w-4" />
                      Facebook
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="overflow-hidden rounded-[32px] border border-[rgba(57,73,171,0.12)] bg-[var(--senlek-dark)] shadow-[0_26px_50px_rgba(26,35,126,0.12)]">
              <iframe
                title="Senlek Thai Rice & Noodles location map"
                src={restaurantInfo.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[620px] w-full border-0"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Helpful details before you visit."
              description="A few quick answers for pickup, parking, reservations, and customizing your meal."
              centered
            />
          </ScrollReveal>

          <div className="mt-12">
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
              {restaurantInfo.faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
