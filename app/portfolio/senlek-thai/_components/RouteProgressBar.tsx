"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 340;
const HIDE_DELAY_MS = 180;
const START_PROGRESS = 0.14;
const MAX_PROGRESS = 0.92;

export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const hasMounted = useRef(false);
  const visibleRef = useRef(false);
  const startedAt = useRef<number | null>(null);
  const progressTimer = useRef<number | null>(null);
  const finishTimer = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (progressTimer.current) {
      window.clearInterval(progressTimer.current);
      progressTimer.current = null;
    }

    if (finishTimer.current) {
      window.clearTimeout(finishTimer.current);
      finishTimer.current = null;
    }
  }, []);

  const beginProgress = useCallback(() => {
    clearTimers();
    startedAt.current = performance.now();
    setVisible(true);
    setProgress((current) => Math.max(current, START_PROGRESS));

    progressTimer.current = window.setInterval(() => {
      setProgress((current) => {
        const next = current + Math.max((MAX_PROGRESS - current) * 0.18, 0.025);
        return Math.min(next, MAX_PROGRESS);
      });
    }, 120);
  }, [clearTimers]);

  const completeProgress = useCallback(() => {
    if (!visibleRef.current && !startedAt.current) {
      return;
    }

    clearTimers();

    const elapsed = startedAt.current ? performance.now() - startedAt.current : MIN_VISIBLE_MS;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);

    finishTimer.current = window.setTimeout(() => {
      setProgress(1);

      finishTimer.current = window.setTimeout(() => {
        setVisible(false);
        setProgress(0);
        startedAt.current = null;
      }, HIDE_DELAY_MS);
    }, remaining);
  }, [clearTimers]);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!target) {
        return;
      }

      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      if (target.hasAttribute("download") || target.getAttribute("target") === "_blank") {
        return;
      }

      const nextUrl = new URL(target.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.origin !== currentUrl.origin) {
        return;
      }

      if (`${nextUrl.pathname}${nextUrl.search}` === `${currentUrl.pathname}${currentUrl.search}`) {
        return;
      }

      beginProgress();
    };

    const handleHistoryNavigation = () => {
      beginProgress();
    };

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handleHistoryNavigation);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handleHistoryNavigation);
      clearTimers();
    };
  }, [beginProgress, clearTimers]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    completeProgress();
  }, [completeProgress, pathname, searchKey]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="senlek-route-progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="senlek-route-progress"
          data-testid="route-progress-bar"
          aria-hidden="true"
        >
          <motion.span
            className="senlek-route-progress__bar"
            animate={{ scaleX: progress }}
            transition={{ duration: progress >= 1 ? 0.16 : 0.14, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
