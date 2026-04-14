"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPinned, PhoneCall, ShoppingBag } from "lucide-react";

import { restaurantInfo } from "../_data/restaurant-info";
import { Button } from "./ui/button";
import { RestaurantStatusBadge } from "./RestaurantStatusBadge";

export function StickyOrderBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.45 }}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4"
      data-testid="sticky-order-bar"
    >
      <div className="mx-auto max-w-7xl">
        <div className="pointer-events-auto md:hidden">
          <div className="overflow-hidden rounded-[28px] border border-white/12 bg-[rgba(28,23,20,0.92)] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <RestaurantStatusBadge compact className="bg-transparent px-0 py-0" />
              <a
                href={restaurantInfo.phoneHref}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white"
                aria-label="Call Senlek Thai Rice & Noodles"
              >
                <PhoneCall className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button asChild className="w-full">
                <a href={restaurantInfo.toast} target="_blank" rel="noreferrer">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Pickup
                </a>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <a href={restaurantInfo.mapsLink} target="_blank" rel="noreferrer">
                  <MapPinned className="mr-2 h-4 w-4" />
                  Visit
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto ml-auto hidden w-full max-w-4xl md:block">
          <div className="flex flex-wrap items-center gap-4 rounded-[32px] border border-white/10 bg-[rgba(28,23,20,0.88)] px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:flex-nowrap">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <RestaurantStatusBadge compact className="shrink-0 bg-transparent px-0 py-0" />
              <p className="min-w-0 flex-1 text-sm leading-6 text-white/70">
                Order direct, call ahead, or map your visit without leaving the flow.
              </p>
            </div>
            <div className="ml-auto flex shrink-0 flex-wrap items-center justify-end gap-2">
              <Button asChild variant="secondary" size="sm">
                <a href={restaurantInfo.phoneHref}>
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Call
                </a>
              </Button>
              <Button asChild size="sm" className="senlek-shimmer whitespace-nowrap">
                <a href={restaurantInfo.toast} target="_blank" rel="noreferrer">
                  Order Online
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
