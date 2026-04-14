"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { restaurantInfo } from "../_data/restaurant-info";
import { Button } from "./ui/button";

export function CTASection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} className="bg-[var(--senlek-cream)] px-4 pb-24 sm:px-6 lg:px-8">
      <motion.div
        style={{ y }}
        className="mx-auto max-w-7xl rounded-[36px] bg-[linear-gradient(135deg,#f0c75e_0%,#d4a017_52%,#c8860a_100%)] px-6 py-10 text-[var(--senlek-dark)] shadow-[0_24px_55px_rgba(212,160,23,0.28)] sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[var(--senlek-blue-900)]/70">
            Order for Pickup or Delivery
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Ready to Experience the Flavors of Thailand?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-[var(--senlek-dark)]/80">
            Order online for pickup or delivery, or call ahead and we will have your favorites ready.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0">
          <Button asChild variant="dark" size="lg">
            <a href={restaurantInfo.toast} target="_blank" rel="noreferrer">
              Order Now
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-[var(--senlek-dark)] text-[var(--senlek-dark)]">
            <a href={restaurantInfo.phoneHref}>Call Us</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
