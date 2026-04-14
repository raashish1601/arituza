"use client";

import { useEffect } from "react";

export function ProtectionLayer() {
  useEffect(() => {
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const onDragStart = (event: DragEvent) => {
      if (event.target instanceof HTMLImageElement) {
        event.preventDefault();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const usesModifier = event.ctrlKey || event.metaKey;
      const devtoolsShortcut =
        key === "f12" ||
        (usesModifier && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (usesModifier && ["u", "s"].includes(key));

      if (devtoolsShortcut) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}
