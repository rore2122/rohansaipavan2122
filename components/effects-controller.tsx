"use client";

import { useEffect, useRef } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function EffectsController() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    /* ---------------------------------------------------------
       Scramble-in text — activates every [data-scramble] node
    --------------------------------------------------------- */
    const scrambleTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scramble]")
    );

    const scrambleNode = (el: HTMLElement) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      let current = walker.nextNode();
      while (current) {
        if (current.textContent && current.textContent.trim()) {
          nodes.push(current as Text);
        }
        current = walker.nextNode();
      }

      nodes.forEach((textNode) => {
        const original = textNode.textContent || "";
        const length = original.length;
        if (reduced || length === 0) return;

        let frame = 0;
        const totalFrames = 16;
        const timer = window.setInterval(() => {
          frame += 1;
          const revealCount = Math.floor((frame / totalFrames) * length);
          let out = "";
          for (let i = 0; i < length; i += 1) {
            const ch = original[i];
            if (ch === " " || ch === "\n") {
              out += ch;
            } else if (i < revealCount) {
              out += ch;
            } else {
              out +=
                SCRAMBLE_CHARS[
                  Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                ];
            }
          }
          textNode.textContent = out;
          if (frame >= totalFrames) {
            textNode.textContent = original;
            window.clearInterval(timer);
          }
        }, 32);
      });
    };

    let scrambleObserver: IntersectionObserver | null = null;
    if (scrambleTargets.length) {
      scrambleObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scrambleNode(entry.target as HTMLElement);
              scrambleObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      scrambleTargets.forEach((el) => scrambleObserver?.observe(el));
    }

    /* ---------------------------------------------------------
       Mask/wipe reveal — [".mask-reveal"] elements
    --------------------------------------------------------- */
    const maskTargets = Array.from(
      document.querySelectorAll<HTMLElement>(".mask-reveal")
    );
    let maskObserver: IntersectionObserver | null = null;
    if (maskTargets.length) {
      maskObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              maskObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      maskTargets.forEach((el) => maskObserver?.observe(el));
    }

    if (reduced) {
      maskTargets.forEach((el) => el.classList.add("is-revealed"));
      return () => {
        scrambleObserver?.disconnect();
        maskObserver?.disconnect();
      };
    }

    /* ---------------------------------------------------------
       Custom cursor + magnetic buttons + glass sheen + parallax
    --------------------------------------------------------- */
    const magneticEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]")
    );
    const glassEls = Array.from(
      document.querySelectorAll<HTMLElement>(".liquid-glass")
    );
    const heroLayer = document.querySelector<HTMLElement>(
      ".hero-name-background"
    );
    const hoverTargets = document.querySelectorAll<HTMLElement>(
      "a, button, [data-magnetic]"
    );

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let rafId = 0;

    const handlePointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    if (!coarsePointer) {
      const handleEnter = () => cursorRef.current?.classList.add("is-hovering");
      const handleLeave = () =>
        cursorRef.current?.classList.remove("is-hovering");
      hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    }

    const magneticRadius = 90;
    const magneticStrength = 0.35;

    const tick = () => {
      if (cursorRef.current && !coarsePointer) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      magneticEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < magneticRadius + rect.width / 2) {
          el.style.setProperty("--magnetic-x", `${dx * magneticStrength}px`);
          el.style.setProperty("--magnetic-y", `${dy * magneticStrength}px`);
        } else {
          el.style.setProperty("--magnetic-x", "0px");
          el.style.setProperty("--magnetic-y", "0px");
        }
      });

      glassEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          const px = ((mouseX - rect.left) / rect.width) * 100;
          const py = ((mouseY - rect.top) / rect.height) * 100;
          el.style.setProperty("--glass-x", `${px}%`);
          el.style.setProperty("--glass-y", `${py}%`);
        }
      });

      if (heroLayer) {
        const nx = (mouseX / window.innerWidth - 0.5) * 2;
        const ny = (mouseY / window.innerHeight - 0.5) * 2;
        heroLayer.style.setProperty("--hero-parallax-x", `${nx * -14}px`);
        heroLayer.style.setProperty("--hero-parallax-y", `${ny * -10}px`);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    /* ---------------------------------------------------------
       Liquid ripple fill on click — [data-liquid] elements
    --------------------------------------------------------- */
    const liquidEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-liquid]")
    );

    const handleLiquidClick = (event: MouseEvent) => {
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width) * 100;
      const py = ((event.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--liquid-x", `${px}%`);
      el.style.setProperty("--liquid-y", `${py}%`);
      el.classList.remove("is-liquid-filling");
      // Force reflow so the animation can restart on rapid clicks
      void el.offsetWidth;
      el.classList.add("is-liquid-filling");
      window.setTimeout(() => el.classList.remove("is-liquid-filling"), 560);
    };

    liquidEls.forEach((el) =>
      el.addEventListener("click", handleLiquidClick)
    );

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(rafId);
      liquidEls.forEach((el) =>
        el.removeEventListener("click", handleLiquidClick)
      );
      scrambleObserver?.disconnect();
      maskObserver?.disconnect();
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />;
}
