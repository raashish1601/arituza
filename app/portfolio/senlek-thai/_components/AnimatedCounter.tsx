"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ value, label, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="rounded-[24px] border border-[rgba(212,160,23,0.22)] bg-white/85 p-6 text-center shadow-[0_16px_40px_rgba(26,35,126,0.08)]"
    >
      <p className="font-display text-4xl font-bold text-[var(--senlek-blue-900)]">
        {prefix}
        {displayValue}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--senlek-warm-gray-500)]">{label}</p>
    </div>
  );
}
