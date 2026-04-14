"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { featuredDishCodes } from "../_data/restaurant-info";
import { menuItems } from "../_data/menu";
import { formatPrice } from "../_lib/utils";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";
import { SpiceLevelIndicator } from "./SpiceLevelIndicator";

const featuredDishes = featuredDishCodes
  .map((code) => menuItems.find((item) => item.code === code))
  .filter(Boolean);

export function FeaturedDishes() {
  return (
    <section id="featured-dishes" className="bg-[var(--senlek-cream)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Signature Picks"
            title="Our Signature Dishes"
            description="From rich noodle soups to market-inspired rice plates, these are the dishes guests remember first."
            centered
          />
        </ScrollReveal>

        <div className="mt-14 flex snap-x gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {featuredDishes.map((item, index) =>
            item ? (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="group min-w-[290px] snap-center rounded-[28px] border border-transparent bg-white p-4 shadow-[0_20px_45px_rgba(26,35,126,0.08)] transition-all hover:border-[rgba(212,160,23,0.4)] hover:shadow-[0_28px_50px_rgba(26,35,126,0.15)] lg:min-w-0"
                data-testid="featured-dish-card"
              >
                <div className="relative overflow-hidden rounded-[24px]">
                  <Image
                    src={item.image}
                    alt={`${item.name} served at Senlek Thai Rice & Noodles.`}
                    width={960}
                    height={720}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                    placeholder="empty"
                  />
                  <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--senlek-gold-500)] font-accent text-sm font-semibold text-[var(--senlek-dark)]">
                    {item.code}
                  </span>
                </div>
                <div className="space-y-4 px-2 pb-2 pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[var(--senlek-blue-900)]">{item.name}</h3>
                      {item.thaiName ? (
                        <p className="mt-1 font-accent text-base italic text-[var(--senlek-warm-gray-500)]">
                          {item.thaiName}
                        </p>
                      ) : null}
                    </div>
                    <p className="font-semibold text-[var(--senlek-gold-600)]">{formatPrice(item.price)}</p>
                  </div>
                  <p className="line-clamp-2 text-sm leading-7 text-[var(--senlek-warm-gray-500)]">{item.description}</p>
                  <SpiceLevelIndicator level={item.spiceLevel} />
                </div>
              </motion.article>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
