import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { restaurantInfo } from "../_data/restaurant-info";
import { ScrollReveal } from "./ScrollReveal";

export function AboutPreview() {
  return (
    <section id="about-preview" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <ScrollReveal x={-36}>
          <div className="space-y-6" data-testid="about-preview-copy">
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[var(--senlek-gold-600)]">
              Our Story
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight text-[var(--senlek-blue-900)] sm:text-5xl">
              {restaurantInfo.aboutPreviewTitle}
            </h2>
            <div className="space-y-5 text-base leading-8 text-[var(--senlek-warm-gray-500)]">
              {restaurantInfo.aboutPreviewCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link
              href={`${restaurantInfo.basePath}/about`}
              className="group inline-flex items-center gap-3 font-semibold text-[var(--senlek-blue-900)]"
            >
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-[var(--senlek-gold-500)] after:transition-transform after:duration-300 group-hover:after:scale-x-0">
                Learn More
              </span>
              <ArrowRight className="h-4 w-4 text-[var(--senlek-gold-600)] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal x={36}>
          <div className="relative mx-auto max-w-md">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[32px] border border-[var(--senlek-gold-400)] bg-[linear-gradient(135deg,rgba(212,160,23,0.1),rgba(57,73,171,0.08))]" />
            <div
              className="relative overflow-hidden rounded-[32px] bg-[var(--senlek-blue-50)] p-3 shadow-[0_22px_45px_rgba(26,35,126,0.12)]"
              data-testid="about-preview-image"
            >
              <Image
                src="/images/senlek/real/about/owner.jpg"
                alt="Nop Sac-Uang standing inside Senlek Thai Rice & Noodles in Hoover."
                width={900}
                height={1200}
                className="aspect-[4/5] w-full rounded-[24px] object-cover object-left"
                placeholder="empty"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
