"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { MenuItem } from "../_lib/types";
import { formatPrice, prettifyTag } from "../_lib/utils";
import { SpiceLevelIndicator } from "./SpiceLevelIndicator";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <motion.article
      layout
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex h-full rounded-[28px] border border-[rgba(57,73,171,0.12)] bg-white/90 p-4 shadow-[0_18px_40px_rgba(26,35,126,0.08)]"
      data-testid="menu-card"
    >
      <div className="grid h-full w-full gap-5 sm:grid-cols-[132px_1fr] sm:items-stretch">
        <div className="relative overflow-hidden rounded-[20px] bg-[var(--senlek-blue-50)]">
          <Image
            src={item.image}
            alt={`${item.name} from Senlek Thai Rice & Noodles.`}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
            placeholder="empty"
          />
          <span className="absolute left-3 top-3 inline-flex rounded-full bg-[var(--senlek-dark)] px-2.5 py-1 font-accent text-xs font-semibold text-[var(--senlek-gold-300)]">
            {item.code}
          </span>
        </div>

        <div className="flex h-full flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-[var(--senlek-blue-900)]">{item.name}</h3>
              {item.thaiName ? (
                <p className="font-accent text-sm italic text-[var(--senlek-warm-gray-500)]">{item.thaiName}</p>
              ) : null}
            </div>
            <p className="text-lg font-semibold text-[var(--senlek-gold-600)]">{formatPrice(item.price)}</p>
          </div>

          <p className="text-sm leading-7 text-[var(--senlek-warm-gray-500)]">{item.description}</p>

          <div className="mt-auto space-y-3 pt-1">
            <div className="flex flex-wrap items-center gap-3">
              <SpiceLevelIndicator level={item.spiceLevel} />
              {item.dietaryTags.map((tag) => (
                <span
                  key={`${item.id}-${tag}`}
                  className="inline-flex rounded-full bg-[var(--senlek-blue-50)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--senlek-blue-700)]"
                >
                  {prettifyTag(tag)}
                </span>
              ))}
            </div>

            {item.proteinOptions?.length ? (
              <p className="text-sm leading-7 text-[var(--senlek-warm-gray-500)]">
                <span className="font-semibold text-[var(--senlek-blue-900)]">Choose:</span> {item.proteinOptions.join(", ")}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
