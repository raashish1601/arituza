import { Flame } from "lucide-react";

import { cn } from "../_lib/utils";

interface SpiceLevelIndicatorProps {
  level: 0 | 1 | 2 | 3;
  className?: string;
}

export function SpiceLevelIndicator({ level, className }: SpiceLevelIndicatorProps) {
  return (
    <div
      className={cn("flex items-center gap-1 text-[var(--senlek-red-500)]", className)}
      aria-label={`Spice level ${level} out of 3`}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Flame
          key={`flame-${index}`}
          className={cn("h-4 w-4", index < level ? "fill-current" : "text-[var(--senlek-warm-gray-200)]")}
        />
      ))}
    </div>
  );
}
