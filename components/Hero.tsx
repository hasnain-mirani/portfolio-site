"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, FileDown } from "lucide-react";
import Image from "next/image";

type HeroProps = {
  name?: string;
  title?: string;
  roles?: string[]; // rotates
  headlineHighlight?: string;
  subtitle?: string;
  avatarSrc?: string; // /public path e.g. /me.jpg
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
};

export default function Hero({
  name = "Hasnain",
  title = "Full-Stack Engineer",
  roles = ["Next.js Specialist", "TypeScript Lover", "SaaS Builder", "DevOps-Ready"],
  headlineHighlight = "shipping production-grade web apps",
  subtitle = "I design, build, and scale modern products with Next.js, Node, Django, Spring Boot and cloud. Focused on performance, clean architecture, and measurable impact.",
  avatarSrc = "/new.png",
  resumeUrl = "/resume.pdf",
  githubUrl = "https://github.com/hasnain-mirani",
  linkedinUrl = "https://www.linkedin.com/in/muhammad-hasnain-mirani",
  email = "mailto:hasnainmirani1122@gmail.com",
}: HeroProps) {
  // simple rotating roles
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, [roles.length]);

  // spring presets
  const spring = useMemo(
    () => ({ type: "spring", stiffness: 120, damping: 16 }),
    []
  );

  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-36">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* soft gradient aura */}
        <div className="absolute left-1/2 top-8 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,.25),transparent_70%)] blur-3xl" />
        {/* faint grid */}
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2">
        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/60 dark:text-zinc-300"
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.65 }}
            className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
          >
            {name},{" "}
            <span className="text-zinc-500 dark:text-zinc-400">the</span>{" "}
            <span className="bg-gradient-to-br from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h1>

          <div className="mt-2 h-8 text-lg text-zinc-600 dark:text-zinc-300 md:h-9 md:text-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-2"
              >
                <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-sm dark:bg-zinc-800">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{roles[idx]}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 max-w-prose text-zinc-600 dark:text-zinc-300"
          >
            I specialise in {headlineHighlight}. {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href="#works"
              className="group inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-md dark:bg-white dark:text-zinc-900"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href={resumeUrl}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <FileDown className="h-4 w-4" />
              Download CV
            </a>
            <div className="ml-1 flex items-center gap-2">
              <a
                href={githubUrl}
                target="_blank"
                aria-label="GitHub"
                className="rounded-xl border p-2 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                aria-label="LinkedIn"
                className="rounded-xl border p-2 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={email}
                aria-label="Email"
                className="rounded-xl border p-2 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Social proof badges */}
          <motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.22, duration: 0.5 }}
  className="mt-6 flex flex-wrap items-center gap-3"
>
  {[
    "Next.js 15 · React 18",
    "TypeScript",
    "Node.js · Express.js",
    "Spring Boot",
    "Django",
    "Flutter · Dart",
    "AWS · Docker · CI/CD",
    "Stripe",
    "shadcn/ui · Tailwind CSS",
    "PostgreSQL · MongoDB · Prisma",
  ].map((tag) => (
    <span
      key={tag}
      className="rounded-full border px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
    >
      {tag}
    </span>
  ))}
</motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="mt-6 grid grid-cols-3 gap-3 md:max-w-lg"
          >
            {[
              { k: "20+", v: "Prod apps" },
              { k: "3y", v: "Experience" },
              { k: "99.9%", v: "Uptime targets" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border p-4 text-center dark:border-zinc-800"
              >
                <div className="text-xl font-bold">{s.k}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Avatar / card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 120, damping: 16 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-5 -z-10 rounded-[28px] bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-2xl" />
          <div className="overflow-hidden rounded-[24px] border shadow-md dark:border-zinc-800">
            <Image
              src={avatarSrc}
              alt={`${name} headshot`}
              width={900}
              height={1100}
              className="h-[480px] w-full object-cover md:h-[560px]"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* bottom padding */}
      <div className="h-12 md:h-16" />
    </section>
  );
}
