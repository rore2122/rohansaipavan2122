"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "liquid-glass-intensity";

// 0 = Clear (max transparency), 100 = Tinted (max opacity) — same idea as
// Settings -> Appearance -> Liquid Glass on iOS 27.
function applyIntensity(value: number) {
  const root = document.documentElement;
  const t = value / 100;
  root.style.setProperty("--glass-opacity", (0.32 + t * 0.5).toFixed(2));
  root.style.setProperty("--glass-blur", `${16 + t * 20}px`);
  root.style.setProperty("--glass-edge-opacity", (0.35 + t * 0.35).toFixed(2));
}

export default function LiquidGlassControl() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(50);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = stored ? Number(stored) : 50;
    setValue(initial);
    applyIntensity(initial);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    setValue(next);
    applyIntensity(next);
    window.localStorage.setItem(STORAGE_KEY, String(next));
  };

  return (
    <div className="lg-control-wrap">
      <button
        type="button"
        className="lg-control-toggle liquid-glass"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="liquid-glass-panel"
      >
        <span aria-hidden="true">◐</span>
        <span className="lg-control-label">Liquid Glass</span>
      </button>

      {open && (
        <div
          id="liquid-glass-panel"
          className="lg-control-panel liquid-glass"
          role="group"
          aria-label="Liquid Glass intensity"
        >
          <div className="lg-control-row">
            <span>Clear</span>
            <span>Tinted</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={handleChange}
            aria-label="Liquid Glass intensity"
            className="lg-control-slider"
          />
        </div>
      )}
    </div>
  );
}
