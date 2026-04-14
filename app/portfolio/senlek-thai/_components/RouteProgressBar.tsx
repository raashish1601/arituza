"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { flushSync } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 360;
const HIDE_DELAY_MS = 160;
const START_PROGRESS = 0.04;
const MAX_PROGRESS = 0.9;
const PROGRESS_DECAY_MS = 540;

export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const hasMounted = useRef(false);
  const visibleRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const startedAtRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (finishTimerRef.current) {
      window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
  }, []);

  const beginProgress = useCallback(() => {
    clearTimers();
    startedAtRef.current = performance.now();
    progressRef.current = START_PROGRESS;
    visibleRef.current = true;

    flushSync(() => {
      setProgress(START_PROGRESS);
      setVisible(true);
    });

    const step = () => {
      if (!startedAtRef.current) {
        animationFrameRef.current = null;
        return;
      }

      const elapsed = performance.now() - startedAtRef.current;
      const nextProgress = Math.min(
        MAX_PROGRESS,
        START_PROGRESS + (MAX_PROGRESS - START_PROGRESS) * (1 - Math.exp(-elapsed / PROGRESS_DECAY_MS))
      );

      if (nextProgress - progressRef.current > 0.001) {
        progressRef.current = nextProgress;
        setProgress(nextProgress);
      }

      if (nextProgress < MAX_PROGRESS - 0.001) {
        animationFrameRef.current = window.requestAnimationFrame(step);
        return;
      }

      animationFrameRef.current = null;
    };

    animationFrameRef.current = window.requestAnimationFrame(step);
  }, [clearTimers]);

  const completeProgress = useCallback(() => {
    if (!visibleRef.current && !startedAtRef.current) {
      return;
    }

    clearTimers();

    const elapsed = startedAtRef.current ? performance.now() - startedAtRef.current : MIN_VISIBLE_MS;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);

    finishTimerRef.current = window.setTimeout(() => {
      progressRef.current = 1;
      setProgress(1);

      finishTimerRef.current = window.setTimeout(() => {
        visibleRef.current = false;
        setVisible(false);
        setProgress(0);
        progressRef.current = 0;
        startedAtRef.current = null;
      }, HIDE_DELAY_MS);
    }, remaining);
  }, [clearTimers]);

  useEffect(() => {
    const resolveElementTarget = (target: EventTarget | null) => {
      if (target instanceof Element) {
        return target;
      }

      if (target instanceof Node) {
        return target.parentElement;
      }

      return null;
    };

    const isNavigableInternalLink = (target: Element | null) => {
      const link = target?.closest("a");
      if (!link) {
        return false;
      }

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return false;
      }

      if (link.hasAttribute("download") || link.getAttribute("target") === "_blank") {
        return false;
      }

      const nextUrl = new URL(link.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.origin !== currentUrl.origin) {
        return false;
      }

      return `${nextUrl.pathname}${nextUrl.search}` !== `${currentUrl.pathname}${currentUrl.search}`;
    };

    const handlePointerDown = (event: PointerEvent) => {
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

      if (isNavigableInternalLink(resolveElementTarget(event.target))) {
        beginProgress();
      }
    };

    const handleClick = (event: MouseEvent) => {
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

      if (isNavigableInternalLink(resolveElementTarget(event.target))) {
        beginProgress();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      if (isNavigableInternalLink(resolveElementTarget(event.target))) {
        beginProgress();
      }
    };

    const handleHistoryNavigation = () => {
      beginProgress();
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("popstate", handleHistoryNavigation);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown, true);
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
    <div
      className="senlek-route-progress"
      data-testid="route-progress-bar"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, visibility: visible ? "visible" : "hidden" }}
    >
      <span className="senlek-route-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
