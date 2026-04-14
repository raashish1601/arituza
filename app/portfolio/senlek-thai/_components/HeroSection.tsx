"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useRef } from "react";

import { restaurantInfo } from "../_data/restaurant-info";
import { RestaurantStatusBadge } from "./RestaurantStatusBadge";
import { Button } from "./ui/button";
import { ThaiPattern } from "./ThaiPattern";

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const ornamentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(240,199,94,0.2),transparent_32%),linear-gradient(135deg,var(--senlek-blue-900),var(--senlek-blue-700))] px-4 pb-24 pt-24 text-white sm:px-6 sm:pt-28 lg:px-8"
    >
      <motion.div style={{ y: ornamentY }} className="absolute left-4 top-28 sm:left-10">
        <ThaiPattern variant="lotus" />
      </motion.div>
      <motion.div style={{ y: glowY }} className="absolute bottom-28 right-8 sm:right-20">
        <ThaiPattern variant="swirl" />
      </motion.div>
      <div className="absolute inset-x-0 top-1/2 mx-auto h-72 max-w-3xl -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.28),transparent_65%)] blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur"
        >
          <span className="mr-2 text-lg" aria-hidden="true">
            🍜
          </span>
          {restaurantInfo.heroBadge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 max-w-4xl whitespace-pre-line font-display text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
        >
          Bold <span className="text-[var(--senlek-gold-300)]">Flavors,</span>
          {"\n"}Made with Care
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-8 text-[var(--senlek-warm-gray-200)] sm:text-lg"
        >
          {restaurantInfo.heroSubheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <RestaurantStatusBadge />
          <span className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/80">
            Pickup, delivery, catering, and gifting all live in one experience.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg">
            <Link href={`${restaurantInfo.basePath}/menu`}>
              View Our Menu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href={restaurantInfo.toast} target="_blank" rel="noreferrer">
              Order Online
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden leading-none text-[var(--senlek-cream)]">
        <svg viewBox="0 0 1440 180" className="h-auto w-full" preserveAspectRatio="none" aria-hidden="true">
          <path
            fill="currentColor"
            d="M0,128L60,138.7C120,149,240,171,360,165.3C480,160,600,128,720,112C840,96,960,96,1080,106.7C1200,117,1320,139,1380,149.3L1440,160L1440,181L1380,181C1320,181,1200,181,1080,181C960,181,840,181,720,181C600,181,480,181,360,181C240,181,120,181,60,181L0,181Z"
          />
        </svg>
      </div>
    </section>
  );
}
