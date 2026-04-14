"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

import { cn, getRestaurantStatus } from "../_lib/utils";

interface RestaurantStatusBadgeProps {
  className?: string;
  compact?: boolean;
}

export function RestaurantStatusBadge({ className, compact = false }: RestaurantStatusBadgeProps) {
  const [status, setStatus] = useState(() => getRestaurantStatus());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatus(getRestaurantStatus());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-left text-white backdrop-blur-md",
        compact && "gap-2 px-3 py-1.5 text-sm",
        status.state === "open" && "border-emerald-300/35 bg-emerald-400/10",
        status.state === "closing-soon" && "border-amber-300/45 bg-amber-300/10",
        status.state === "closed" && "border-white/12 bg-black/15",
        className
      )}
      data-testid="restaurant-status"
    >
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full",
          status.state === "open" && "bg-emerald-300",
          status.state === "closing-soon" && "bg-amber-300",
          status.state === "closed" && "bg-white/55"
        )}
        aria-hidden="true"
      />
      <Clock3 className={cn("h-4 w-4 text-white/85", compact && "h-3.5 w-3.5")} />
      <div className="flex flex-col">
        <span className={cn("text-sm font-semibold tracking-[0.04em]", compact && "text-xs")}>{status.label}</span>
        <span className={cn("text-xs text-white/75", compact && "hidden sm:block")}>{status.detail}</span>
      </div>
    </div>
  );
}
