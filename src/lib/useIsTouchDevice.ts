"use client";

import { useEffect, useState } from "react";

/**
 * Detects whether the current device is a coarse-pointer (touch) device.
 * SSR-safe — returns `false` on the server and during initial render, then
 * updates on mount. Listens to `(pointer: coarse)` media query changes so it
 * adapts when a hybrid device attaches a mouse.
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(mql.matches);

    update();

    // Safari < 14 uses the deprecated addListener API
    if (mql.addEventListener) {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    } else {
      mql.addListener(update);
      return () => mql.removeListener(update);
    }
  }, []);

  return isTouch;
}
