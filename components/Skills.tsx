"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Cpu, Database, Network, Settings } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  level: number; // 0–100
  since?: string;
  notes?: string;
  cat: "Frontend" | "Backend" | "Database" | "DevOps" | "Other";
};

const ALL: Skill[] = [
  { id: "next", name: "Next.js 15", level: 92, since: "2019", notes: "RSC, App Router, caching", cat: "Frontend" },
  { id: "react", name: "React", level: 94, since: "2017", notes: "Hooks, perf, a11y", cat: "Frontend" },
  { id: "ts", name: "TypeScript", level: 90, since: "2018", notes: "strict, generics, utils", cat: "Frontend" },
  { id: "tailwind", name: "Tailwind CSS", level: 92, since: "2020", notes: "design tokens, theming", cat: "Frontend" },
  { id: "node", name: "Node.js", level: 90, since: "2017", notes: "streams, workers", cat: "Backend" },
  { id: "express", name: "Express", level: 88, since: "2017", notes: "versioned APIs", cat: "Backend" },
  { id: "nest", name: "NestJS", level: 82, since: "2021", notes: "modules, guards, pipes", cat: "Backend" },
  { id: "pg", name: "PostgreSQL", level: 82, since: "2020", notes: "indexes, RLS basics", cat: "Database" },
  { id: "mongo", name: "MongoDB", level: 86, since: "2018", notes: "indexes, agg pipeline", cat: "Database" },
  { id: "prisma", name: "Prisma", level: 84, since: "2021", notes: "migrations, Zod schemas", cat: "Database" },
  { id: "aws", name: "AWS (EC2/S3/ALB)", level: 78, since: "2019", notes: "blue-green, backups", cat: "DevOps" },
  { id: "docker", name: "Docker", level: 85, since: "2019", notes: "multi-stage builds", cat: "DevOps" },
  { id: "nginx", name: "Nginx", level: 82, since: "2019", notes: "TLS, caching, gzip/br", cat: "DevOps" },
  { id: "stripe", name: "Stripe", level: 80, since: "2020", notes: "subs, webhooks, dunning", cat: "Other" },
  { id: "supabase", name: "Supabase", level: 78, since: "2022", notes: "Auth, Storage, RLS", cat: "Other" },
];

const CATS = ["All", "Frontend", "Backend", "Database", "DevOps", "Other"] as const;

export default function Skills() {
  const [active, setActive] = useState<(typeof CATS)[number]>("All");
  const [query, setQuery] = useState("");

  const skills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL.filter((s) => {
      const byCat = active === "All" || s.cat === active;
      const byQuery = !q || s.name.toLowerCase().includes(q) || (s.notes ?? "").toLowerCase().includes(q);
      return byCat && byQuery;
    }).sort((a, b) => b.level - a.level);
  }, [active, query]);

  return (
    <section id="skills" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Skills & Stack</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            Modern, production-tested tools across frontend, backend, databases, and DevOps.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "bg-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  } dark:border-zinc-700`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="relative md:min-w-[260px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills…"
              className="w-full rounded-xl border bg-white/70 px-3 py-2 text-sm backdrop-blur placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60"
            />
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {skills.map((s, idx) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="rounded-2xl border bg-white/60 p-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60"
                title={s.notes}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold">{s.name}</div>
                  <span className="rounded-lg border px-2 py-0.5 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                    {s.cat}
                  </span>
                </div>

                {/* Meter */}
                <div className="mt-3">
                  <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ duration: 0.8, delay: 0.15 + idx * 0.02 }}
                      className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Proficiency</span>
                    <span>{s.level}%</span>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{s.notes ?? "Production use"}</span>
                  </div>
                  {s.since && (
                    <span className="text-zinc-500 dark:text-zinc-400">Since {s.since}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Icons legend (optional) */}
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border p-4 text-sm dark:border-zinc-800 md:grid-cols-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4" /> Frontend = UI/UX & performance
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> Backend = APIs & auth
          </div>
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" /> Database = schema & queries
          </div>
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4" /> DevOps = deploy & observe
          </div>
        </div>
      </div>
    </section>
  );
}
