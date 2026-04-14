import { Quote } from "lucide-react";

import { testimonials } from "../_data/testimonials";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

const marqueeTestimonials = [...testimonials, ...testimonials];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[var(--senlek-blue-900)] px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="senlek-pattern absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Guest Reviews"
            title="Food that feels transportive, warm, and deeply authentic."
            description="A few of the reactions Senlek guests are already sharing."
            centered
            className="[&_h2]:text-white [&_p:last-child]:text-white/75"
          />
        </ScrollReveal>

        <div className="senlek-marquee mt-14">
          <div className="senlek-marquee-track" aria-label="Testimonials">
            {marqueeTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.id}-${index}`}
                className="mx-3 flex w-[320px] shrink-0 flex-col rounded-[28px] border border-white/10 bg-white/8 p-6 backdrop-blur-sm"
              >
                <Quote className="h-8 w-8 text-[var(--senlek-gold-300)]" />
                <p className="mt-5 text-base italic leading-8 text-white/90">{testimonial.quote}</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--senlek-gold-300)]">
                  {testimonial.source}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
