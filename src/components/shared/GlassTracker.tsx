"use client";

import { useEffect } from "react";

export function GlassTracker() {
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const cards = document.querySelectorAll<HTMLElement>(".glass");
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        card.style.setProperty("--mouse-x", x + "%");
        card.style.setProperty("--mouse-y", y + "%");
      }
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}
