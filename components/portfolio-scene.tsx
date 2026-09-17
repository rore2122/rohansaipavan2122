"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect } from "react";

export default function PortfolioScene() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const reduced = useReducedMotion();

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  const portraitX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const portraitY = useTransform(smoothY, [-1, 1], [-8, 8]);

  // const orbitX = useTransform(smoothX, [-1, 1], [-20, 20]); // Decorative orbit disabled.
  // const orbitY = useTransform(smoothY, [-1, 1], [-14, 14]); // Decorative orbit disabled.

  useEffect(() => {
    if (reduced) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;

      mouseX.set((x - 0.5) * 2);
      mouseY.set((y - 0.5) * 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, reduced]);

  return (
    <div className="portfolio-scene">
      {/* Decorative atmosphere */}
      <div className="scene-glow" />

      {/* DISABLED: {/* Copper orbit * /} */}
      {/* DISABLED: <motion.div */}
      {/* DISABLED: className="scene-orbit scene-orbit-one" */}
      {/* DISABLED: style={{ */}
      {/* DISABLED: x: orbitX, */}
      {/* DISABLED: y: orbitY, */}
      {/* DISABLED: }} */}
      {/* DISABLED: /> */}
      {/* */}
      {/* DISABLED: <motion.div */}
      {/* DISABLED: className="scene-orbit scene-orbit-two" */}
      {/* DISABLED: style={{ */}
      {/* DISABLED: x: orbitX, */}
      {/* DISABLED: y: orbitY, */}
      {/* DISABLED: }} */}
      {/* DISABLED: /> */}
      {/* */}
      {/* Copper particles */}
      <div className="scene-particle particle-one" />
      <div className="scene-particle particle-two" />
      <div className="scene-particle particle-three" />
      <div className="scene-particle particle-four" />

      {/* Small top intelligence label */}
      <div className="scene-intelligence">
        <span className="intelligence-dot" />
        <span>DATA INTELLIGENCE</span>
      </div>

      {/* Index */}
      <div className="scene-index">
        <span>01</span>
        <i>/</i>
        <span>04</span>
      </div>

      {/* Portrait */}
      <motion.div
        className="portrait-wrapper"
        style={{
          x: portraitX,
          y: portraitY,
        }}
      >
        <div className="portrait-light" />

        <img
          src="/assets/profile.png"
          alt="Rohan Sai Pavan"
          className="portrait-image"
        />
      </motion.div>

      {/* DISABLED: {/* Right quote * /} */}
      {/* DISABLED: <div className="scene-quote"> */}
      {/* DISABLED: <div className="quote-mark">“</div> */}
      {/* */}
      {/* DISABLED: <p> */}
      {/* DISABLED: Data tells */}
      {/* DISABLED: <br /> */}
      {/* DISABLED: stories. */}
      {/* DISABLED: <br /> */}
      {/* DISABLED: I make them */}
      {/* DISABLED: <br /> */}
      {/* DISABLED: meaningful. */}
      {/* DISABLED: </p> */}
      {/* */}
      {/* DISABLED: <span className="quote-line" /> */}
      {/* DISABLED: </div> */}
      {/* */}
      {/* Vertical intelligence words */}
      <div className="scene-words">
        <span>ANALYZE</span>
        <span>SOLVE</span>
        <span>VISUALIZE</span>
        <span>IMPACT</span>
      </div>

      {/* Portrait signature */}
      <div className="portrait-signature">
        <div className="signature-name">ROHAN SAI PAVAN</div>

        <div className="signature-line" />

        <div className="signature-role">
          DATA ANALYST · AI &amp; DATA SCIENCE
        </div>
      </div>
    </div>
  );
}
