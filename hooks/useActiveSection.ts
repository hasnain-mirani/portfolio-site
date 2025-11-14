"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  ids: string[];             // e.g. ["home","about","services","works","resume","contact"]
  rootMargin?: string;       // tweak when a section becomes 'active'
  threshold?: number[];      // visibility thresholds
};

export default function useActiveSection({
  ids,
  rootMargin = "-40% 0px -55% 0px",
  threshold = [0, 0.25, 0.5, 0.75, 1],
}: Options) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
  const ioRef = useRef<IntersectionObserver | null>(null);
  const frameRef = useRef<number | null>(null);
  const visibilityRef = useRef<Record<string, number>>({}); // id -> intersectionRatio

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    // reset
    visibilityRef.current = {};
    ids.forEach((id) => (visibilityRef.current[id] = 0));

    const onIntersect: IntersectionObserverCallback = (entries) => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          visibilityRef.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        // choose the most visible section
        let bestId = activeId;
        let bestRatio = -1;
        for (const id of ids) {
          const r = visibilityRef.current[id] ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        if (bestId && bestId !== activeId) setActiveId(bestId);

        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      });
    };

    ioRef.current = new IntersectionObserver(onIntersect, { root: null, rootMargin, threshold });
    elements.forEach((el) => ioRef.current?.observe(el));

    // initial tick (in case top is already visible)
    onIntersect(elements.map((el) => ({
      target: el,
      isIntersecting: true,
      intersectionRatio: 1,
      boundingClientRect: el.getBoundingClientRect(),
      intersectionRect: el.getBoundingClientRect(),
      rootBounds: null,
      time: performance.now(),
    })) as any, ioRef.current!);

    const onResize = () => {
      // force recompute on resize
      elements.forEach((el) => ioRef.current?.unobserve(el));
      elements.forEach((el) => ioRef.current?.observe(el));
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      elements.forEach((el) => ioRef.current?.unobserve(el));
      ioRef.current?.disconnect();
      ioRef.current = null;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|"), rootMargin, threshold.join(",")]);

  return activeId;
}
