"use client";

import { useEffect, useRef, useState } from "react";

/**
 * NavProgress
 * - Smooth scroll progress bar (top of page, under navbar)
 * - Optional segmented mode: pass section IDs to show per-section progress
 *
 * Usage (inside Header):
 *   <div className="border-b ..."> ...navbar... </div>
 *   <NavProgress height={3} className="sticky top-[56px]" />
 *
 * Or segmented:
 *   <NavProgress height={4} segments={["home","about","services","works","resume","contact"]} />
 */
type Props = {
  height?: number;               // bar height in px
  className?: string;
  colorClass?: string;           // tailwind class for bar color
  trackClass?: string;           // tailwind class for track bg
  segments?: string[];           // section element IDs (without #)
  segmentGapPx?: number;         // gap between segments
};

export default function NavProgress({
  height = 3,
  className = "",
  colorClass = "from-violet-500 to-fuchsia-500",
  trackClass = "bg-zinc-200/60 dark:bg-zinc-800/60",
  segments,
  segmentGapPx = 6,
}: Props) {
  const [progress, setProgress] = useState(0); // 0..1
  const [segmentProgress, setSegmentProgress] = useState<number[]>([]); // per-segment 0..1
  const rafRef = useRef<number | null>(null);

  // Smooth full-page progress
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        setProgress(p);
        rafRef.current && window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // If segmented, compute per-section progress using DOM positions
  useEffect(() => {
    if (!segments || segments.length === 0) return;

    const calc = () => {
      const viewportH = window.innerHeight;
      const results = segments.map((id) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const total = rect.height + viewportH; // consider entering + leaving
        // visible amount within viewport:
        const topVisible = Math.min(viewportH, Math.max(0, viewportH - Math.max(0, rect.top)));
        const bottomVisible = Math.min(viewportH, Math.max(0, rect.bottom));
        // approximate visibility by overlap across pass:
        const visible = Math.min(total, Math.max(0, topVisible + (viewportH - bottomVisible)));
        const ratio = Math.min(1, Math.max(0, visible / total));
        return ratio;
      });
      setSegmentProgress(results);
    };

    let ticking = false;
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        calc();
        ticking = false;
      });
    };

    calc();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [segments]);

  if (segments && segments.length > 0) {
    // Segmented render
    const gap = segmentGapPx;
    return (
      <div
        className={`w-full ${className}`}
        style={{ height }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page section progress"
      >
        <div className="flex w-full items-stretch" style={{ gap }}>
          {segments.map((_, i) => (
            <div
              key={i}
              className={`relative flex-1 overflow-hidden rounded-full ${trackClass}`}
              style={{ height }}
            >
              <div
                className={`absolute inset-y-0 left-0 bg-linear-to-r ${colorClass}`}
                style={{
                  width: `${Math.round((segmentProgress[i] ?? 0) * 100)}%`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Single continuous bar
  return (
    <div
      className={`w-full ${className}`}
      style={{ height }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-label="Page progress"
    >
      <div
        className={`h-full w-full overflow-hidden rounded-full ${trackClass}`}
        style={{ height }}
      >
        <div
          className={`h-full bg-gradient-to-r ${colorClass}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
