"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const coarsePointer = window.matchMedia(
      "(pointer: coarse)"
    ).matches;

    /*
     * Do not run Lenis on reduced-motion devices.
     * Also avoid forcing smooth-wheel behavior on touch devices.
     */
    if (reduced) return;

    const lenis = new Lenis({
      duration: coarsePointer ? 0.8 : 1.05,
      easing: (t: number) =>
        1 - Math.pow(1 - t, coarsePointer ? 3 : 4),
      smoothWheel: !coarsePointer,
      touchMultiplier: coarsePointer ? 1 : 1.05,
      wheelMultiplier: 0.9,
      syncTouch: false,
    });

    document.documentElement.classList.add("lenis");

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return null;
}
