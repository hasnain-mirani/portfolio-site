"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating?: number; // 1..5
  avatar?: string; // /public path
  logo?: string;   // /public path
};

type Logo = { id: string; src: string; alt: string };

type Props = {
  heading?: string;
  sub?: string;
  items?: Testimonial[];
  logos?: Logo[];
  intervalMs?: number; // autoplay interval
};

const DEFAULTS: Testimonial[] = [
  {
    id: "t1",
    name: "Amelia Carter",
    role: "CTO",
    company: "Northline",
    quote:
      "Incredibly fast delivery with rock-solid code quality. Our Next.js app feels night-and-day better.",
    rating: 5,
    avatar: "/avatars/amelia.png",
    logo: "/logos/northline.jpg",
  },
  {
    id: "t2",
    name: "Lucas Kim",
    role: "Founder",
    company: "TrackHive",
    quote:
      "Scoped, shipped, and launched without drama. Clear updates and measurable performance wins.",
    rating: 5,
    avatar: "/avatars/lucas.jpg",
    logo: "/logos/trackhive.svg",
  },
  {
    id: "t3",
    name: "Zara Ahmed",
    role: "Product Lead",
    company: "Finico",
    quote:
      "Stripe subscriptions, auth, and analytics wired perfectly. Exactly what our MVP needed.",
    rating: 5,
    avatar: "/avatars/zara.jpg",
    logo: "/logos/finico.svg",
  },
];

const CLIENT_LOGOS: Logo[] = [
  { id: "l1", src: "/logos/northline.svg", alt: "Northline" },
  { id: "l2", src: "/logos/trackhive.svg", alt: "TrackHive" },
  { id: "l3", src: "/logos/finico.svg", alt: "Finico" },
  { id: "l4", src: "/logos/aurory.svg", alt: "Aurory" },
  { id: "l5", src: "/logos/leafpay.svg", alt: "LeafPay" },
];

export default function Testimonials({
  heading = "What clients say",
  sub = "Real feedback from teams I’ve shipped with.",
  items = DEFAULTS,
  logos = CLIENT_LOGOS,
  intervalMs = 5000,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const safe = Math.max(1, items.length);
  const timerRef = useRef<number | null>(null);

  const next = () => setIdx((i) => (i + 1) % safe);
  const prev = () => setIdx((i) => (i - 1 + safe) % safe);

  // autoplay
  useEffect(() => {
    if (paused || safe <= 1) return;
    timerRef.current && window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(next, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused, safe, intervalMs]);

  // star helpers
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i < (items[idx].rating ?? 5)), [idx, items]);

  return (
    <section id="testimonials" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">{sub}</p>
        </div>

        {/* Slider */}
        <div
          className="mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto max-w-3xl">
            {/* Card */}
            <AnimatePresence mode="wait">
              <motion.article
                key={items[idx].id}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border bg-white/70 p-6 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60"
                itemScope
                itemType="https://schema.org/Review"
                aria-live="polite"
              >
                {/* rating */}
                <div className="flex items-center gap-1">
                  {stars.map((on, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${on ? "fill-yellow-400 text-yellow-400" : "text-zinc-300 dark:text-zinc-700"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* quote */}
                <blockquote className="mt-3 text-lg leading-relaxed text-zinc-800 dark:text-zinc-100" itemProp="reviewBody">
                  “{items[idx].quote}”
                </blockquote>

                {/* person */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border dark:border-zinc-800">
                    <Image
                      src={items[idx].avatar ?? "/avatars/default.jpg"}
                      alt={`${items[idx].name} avatar`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <span itemProp="name">{items[idx].name}</span>
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {items[idx].role} · {items[idx].company}
                    </div>
                  </div>
                  {items[idx].logo && (
                    <div className="ml-auto opacity-70">
                      <Image
                        src={items[idx].logo!}
                        alt={`${items[idx].company} logo`}
                        width={72}
                        height={24}
                      />
                    </div>
                  )}
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="rounded-xl border px-3 py-1.5 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1">
                {items.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setIdx(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2.5 w-2.5 rounded-full border transition ${
                      i === idx
                        ? "bg-zinc-900 dark:bg-white"
                        : "bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:border-zinc-700"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play autoplay" : "Pause autoplay"}
                className="rounded-xl border px-3 py-1.5 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="rounded-xl border px-3 py-1.5 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Client logos marquee (optional) */}
        {logos.length > 0 && (
          <div className="mt-12 overflow-hidden">
            <div className="pointer-events-none absolute h-12 w-full bg-gradient-to-r from-white via-transparent to-white opacity-70 dark:from-zinc-950 dark:to-zinc-950" />
            <motion.div
              className="flex gap-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {[...logos, ...logos].map((l, i) => (
                <div key={`${l.id}-${i}`} className="shrink-0 opacity-70">
                  <Image src={l.src} alt={l.alt} width={120} height={36} />
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
