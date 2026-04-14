import { Clock3, MapPin, Phone } from "lucide-react";

import { businessHours } from "../_data/hours";
import { restaurantInfo } from "../_data/restaurant-info";
import { getCurrentBusinessDayIndex } from "../_lib/utils";
import { Button } from "./ui/button";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

export function LocationSection() {
  const currentDayIndex = getCurrentBusinessDayIndex();

  return (
    <section id="location-hours" className="bg-[var(--senlek-cream)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <ScrollReveal>
          <div className="overflow-hidden rounded-[32px] border border-[rgba(57,73,171,0.12)] bg-white shadow-[0_22px_45px_rgba(26,35,126,0.08)]">
            <iframe
              title="Senlek Thai Rice & Noodles map"
              src={restaurantInfo.mapsEmbed}
              loading="lazy"
              className="h-[380px] w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Visit Us"
              title="Find Senlek at The Plaza at Riverchase."
              description="Drop in for lunch, dinner, pickup, or a quick Thai tea break during the week."
            />

            <div className="space-y-5 rounded-[28px] border border-[rgba(57,73,171,0.12)] bg-white/90 p-6 shadow-[0_18px_40px_rgba(26,35,126,0.08)]">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-[var(--senlek-gold-600)]" />
                <div className="text-sm leading-7 text-[var(--senlek-warm-gray-500)]">
                  <p className="font-semibold text-[var(--senlek-blue-900)]">{restaurantInfo.addressLine1}</p>
                  <p>{restaurantInfo.addressLine2}</p>
                  <p>{restaurantInfo.shoppingCenter}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-[var(--senlek-gold-600)]" />
                <a href={restaurantInfo.phoneHref} className="font-semibold text-[var(--senlek-blue-900)]">
                  {restaurantInfo.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Clock3 className="mt-1 h-5 w-5 text-[var(--senlek-gold-600)]" />
                <table className="w-full text-sm text-[var(--senlek-warm-gray-500)]">
                  <tbody>
                    {businessHours.map((hour, index) => {
                      const isCurrent = index === currentDayIndex;

                      return (
                        <tr key={hour.day} className={isCurrent ? "text-[var(--senlek-blue-900)]" : undefined}>
                          <td className="py-1 pr-4 font-medium">{hour.day}</td>
                          <td className={isCurrent ? "font-semibold text-[var(--senlek-gold-600)]" : undefined}>
                            {hour.display}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Button asChild className="mt-2">
                <a href={restaurantInfo.mapsLink} target="_blank" rel="noreferrer">
                  Get Directions
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
