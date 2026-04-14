"use client";

import { Sparkles } from "lucide-react";

import { cn } from "../_lib/utils";

interface RestaurantStatusBadgeProps {
  className?: string;
  compact?: boolean;
}

export function RestaurantStatusBadge({ className, compact = false }: RestaurantStatusBadgeProps) {
  const label = compact ? "Order Ready" : "Ordering Experience Live";
  const detail = compact
    ? "Pickup, delivery, catering, and gifting"
    : "Pickup, delivery, call-ahead, catering, and gifting ready for the full client demo.";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-[var(--senlek-gold-300)]/35 bg-[rgba(212,160,23,0.12)] px-4 py-2 text-left text-white backdrop-blur-md",
        compact && "gap-2 px-3 py-1.5 text-sm",
        className
      )}
      data-testid="restaurant-status"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--senlek-gold-300)]" aria-hidden="true" />
      <Sparkles className={cn("h-4 w-4 text-[var(--senlek-gold-300)]", compact && "h-3.5 w-3.5")} />
      <div className={cn("flex flex-col", compact && "min-w-0")}>
        <span className={cn("text-sm font-semibold tracking-[0.04em]", compact && "text-xs")}>{label}</span>
        <span className={cn("text-xs text-white/75", compact && "hidden xl:block")}>{detail}</span>
      </div>
    </div>
  );
}
