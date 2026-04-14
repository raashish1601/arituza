"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

import type { MenuItem } from "../_lib/types";
import { formatPrice, prettifyTag } from "../_lib/utils";
import { SpiceLevelIndicator } from "./SpiceLevelIndicator";
import { Button } from "./ui/button";

interface MenuCardProps {
  item: MenuItem;
  isSaved: boolean;
  onOpen: (itemId: string) => void;
  onToggleSave: (itemId: string) => void;
}

export function MenuCard({ item, isSaved, onOpen, onToggleSave }: MenuCardProps) {
  return (
    <motion.article
      layout
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex h-full rounded-[28px] border border-[rgba(57,73,171,0.12)] bg-white/90 p-4 shadow-[0_18px_40px_rgba(26,35,126,0.08)]"
      data-testid="menu-card"
    >
      <div className="grid h-full w-full gap-5 sm:grid-cols-[132px_1fr] sm:items-stretch">
        <div className="senlek-watermark relative overflow-hidden rounded-[20px] bg-[var(--senlek-blue-50)]">
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
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold text-[var(--senlek-gold-600)]">{formatPrice(item.price)}</p>
              <button
                type="button"
                onClick={() => onToggleSave(item.id)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(57,73,171,0.14)] text-[var(--senlek-blue-900)] transition hover:border-[var(--senlek-gold-500)] hover:text-[var(--senlek-gold-600)]"
                aria-label={`${isSaved ? "Remove" : "Save"} ${item.name} in flavor passport`}
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current text-[var(--senlek-gold-600)]" : ""}`} />
              </button>
            </div>
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

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button type="button" variant="outline" size="sm" onClick={() => onOpen(item.id)}>
                <Sparkles className="mr-2 h-4 w-4" />
                Details
              </Button>
              <Button type="button" size="sm" onClick={() => onOpen(item.id)}>
                View Pairings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
