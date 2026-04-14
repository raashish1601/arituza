"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Heart, Sparkles, X } from "lucide-react";
import { useEffect } from "react";

import { restaurantInfo } from "../_data/restaurant-info";
import type { MenuItem } from "../_lib/types";
import { formatPrice, prettifyTag } from "../_lib/utils";
import { SpiceLevelIndicator } from "./SpiceLevelIndicator";
import { Button } from "./ui/button";

interface DishDetailDialogProps {
  item: MenuItem | null;
  relatedItems: MenuItem[];
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (itemId: string) => void;
}

export function DishDetailDialog({
  item,
  relatedItems,
  isSaved,
  onClose,
  onToggleSave
}: DishDetailDialogProps) {
  useEffect(() => {
    if (!item) {
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(10,10,14,0.72)] px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.name} details`}
          data-testid="dish-detail-dialog"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="senlek-scrollbar-hidden max-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-y-auto rounded-[34px] bg-[var(--senlek-warm-white)] shadow-[0_40px_100px_rgba(0,0,0,0.32)] lg:max-h-[calc(100vh-3rem)] lg:overflow-hidden"
            data-testid="dish-detail-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid lg:h-full lg:grid-cols-[0.98fr_1.02fr]">
              <div
                className="senlek-watermark relative min-h-[320px] overflow-hidden bg-[var(--senlek-blue-900)] lg:min-h-0 lg:h-full"
                data-testid="dish-detail-media"
              >
                <Image
                  src={item.image}
                  alt={`${item.name} from Senlek Thai Rice & Noodles.`}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover object-center"
                  placeholder="empty"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur"
                  aria-label="Close dish details"
                >
                  <X className="h-5 w-5" />
                </button>
                <span className="absolute left-4 top-4 inline-flex rounded-full bg-[var(--senlek-dark)] px-3 py-1 font-accent text-xs font-semibold tracking-[0.2em] text-[var(--senlek-gold-300)]">
                  {item.code}
                </span>
              </div>

              <div
                className="senlek-scrollbar-hidden flex min-h-0 flex-col p-6 sm:p-8 lg:overflow-y-auto"
                data-testid="dish-detail-content"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--senlek-gold-600)]">
                      Signature Dish Detail
                    </p>
                    <h2 className="mt-3 font-display text-[clamp(2.4rem,4vw,4rem)] font-bold leading-tight text-[var(--senlek-blue-900)]">
                      {item.name}
                    </h2>
                    {item.thaiName ? (
                      <p className="mt-2 font-accent text-lg italic text-[var(--senlek-warm-gray-500)]">
                        {item.thaiName}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-2xl font-semibold text-[var(--senlek-gold-600)]">{formatPrice(item.price)}</p>
                </div>

                <p className="mt-5 text-base leading-8 text-[var(--senlek-warm-gray-500)]">{item.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <SpiceLevelIndicator level={item.spiceLevel} />
                  {item.dietaryTags.map((tag) => (
                    <span
                      key={`${item.id}-${tag}`}
                      className="inline-flex rounded-full bg-[var(--senlek-blue-50)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--senlek-blue-700)]"
                    >
                      {prettifyTag(tag)}
                    </span>
                  ))}
                </div>

                {item.proteinOptions?.length ? (
                  <div className="mt-6 rounded-[24px] border border-[rgba(57,73,171,0.12)] bg-white p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--senlek-gold-600)]">
                      Protein options
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--senlek-warm-gray-500)]">
                      {item.proteinOptions.join(", ")}
                    </p>
                  </div>
                ) : null}

                <div className="mt-6 rounded-[24px] border border-[rgba(57,73,171,0.12)] bg-[var(--senlek-cream)] p-4">
                  <div className="flex items-center gap-2 text-[var(--senlek-blue-900)]">
                    <Sparkles className="h-4 w-4 text-[var(--senlek-gold-600)]" />
                    <p className="text-sm font-semibold uppercase tracking-[0.16em]">Best pairings</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {relatedItems.map((relatedItem) => (
                      <span
                        key={`${item.id}-${relatedItem.id}`}
                        className="inline-flex rounded-full border border-[rgba(57,73,171,0.14)] bg-white px-3 py-1 text-sm text-[var(--senlek-warm-gray-500)]"
                      >
                        {relatedItem.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="senlek-shimmer">
                    <a href={restaurantInfo.toast} target="_blank" rel="noreferrer">
                      Order This on Toast
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant={isSaved ? "dark" : "outline"}
                    onClick={() => onToggleSave(item.id)}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                    {isSaved ? "Saved To Passport" : "Save To Passport"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
