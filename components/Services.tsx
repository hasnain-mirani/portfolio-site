"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  LayoutGrid,
  Rocket,
  ShieldCheck,
  Server,
  Boxes,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

type Service = {
  id: string;
  title: string;
  blurb: string;
  perks: string[];
  icon: React.ReactNode;
  category: "Frontend" | "Backend" | "DevOps" | "Consulting";
  from?: string; // pricing hint e.g. "$999+"
  ctaHref?: string;
};

const ALL: Service[] = [
  {
    id: "nextjs-pro",
    title: "Next.js App Development",
    blurb:
      "Design systems, pixel-perfect UIs, and SEO-ready pages with RSC, caching, and accessibility.",
    perks: [
      "App Router + RSC",
      "TypeScript, Tailwind, Shadcn UI",
      "Performance profiling",
    ],
    icon: <LayoutGrid className="h-5 w-5" />,
    category: "Frontend",
    from: "$1,499+",
    ctaHref: "#contact",
  },
  {
    id: "saas-backend",
    title: "SaaS Backend & APIs",
    blurb:
      "Clean, versioned REST/GraphQL APIs with authentication, RBAC, and observability.",
    perks: ["Node/NestJS", "Postgres/Mongo + Prisma/Mongoose", "Rate limits & caching"],
    icon: <Server className="h-5 w-5" />,
    category: "Backend",
    from: "$1,999+",
    ctaHref: "#contact",
  },
  {
    id: "devops-ci",
    title: "DevOps & Reliability",
    blurb:
      "Dockerized deployments, zero-downtime rollouts, logs/metrics, and cost-aware infra.",
    perks: ["AWS EC2/ALB/S3", "Nginx, Docker, PM2", "CI/CD & IaC basics"],
    icon: <Boxes className="h-5 w-5" />,
    category: "DevOps",
    from: "$1,299+",
    ctaHref: "#contact",
  },
  {
    id: "perf-security",
    title: "Audit: Performance & Security",
    blurb:
      "Holistic review of app performance, OWASP-aligned checks, and prioritized fixes.",
    perks: ["Core Web Vitals", "Auth/RBAC review", "Actionable report"],
    icon: <ShieldCheck className="h-5 w-5" />,
    category: "Consulting",
    from: "$699",
    ctaHref: "#contact",
  },
  {
    id: "launch-mvp",
    title: "MVP Launch Program",
    blurb:
      "Scope → build → ship in weeks. Core features, payments, auth, and analytics wired.",
    perks: ["Stripe subscriptions", "Supabase/Prisma DB", "Analytics & events"],
    icon: <Rocket className="h-5 w-5" />,
    category: "Backend",
    from: "$3,999+",
    ctaHref: "#contact",
  },
  {
    id: "ux-polish",
    title: "UX Polish & Design Systems",
    blurb:
      "Refine flows, states, and components. Shadcn-based DS tailored to your brand.",
    perks: ["Component library", "Empty/error/loading states", "Docs & tokens"],
    icon: <Sparkles className="h-5 w-5" />,
    category: "Frontend",
    from: "$1,199+",
    ctaHref: "#contact",
  },
];

const CATS = ["All", "Frontend", "Backend", "DevOps", "Consulting"] as const;

export default function Services() {
  const [active, setActive] = useState<(typeof CATS)[number]>("All");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (active === "All") return ALL;
    return ALL.filter((s) => s.category === active);
  }, [active]);

  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Services</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            End-to-end product delivery: frontend, backend, infrastructure, and audits. Built for speed,
            reliability, and measurable impact.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
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

        {/* Cards */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((s, idx) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="group flex flex-col rounded-2xl border bg-white/60 p-5 backdrop-blur transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/70">
                  {s.icon}
                </div>
                <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{s.blurb}</p>

                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {s.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-between gap-2">
                  {s.from ? (
                    <span className="rounded-lg border px-2 py-0.5 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                      From {s.from}
                    </span>
                  ) : (
                    <span />
                  )}
                  {s.ctaHref && (
                    <a
                      href={s.ctaHref}
                      className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                      Start now <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Process */}
        <div className="mt-12 rounded-2xl border p-6 dark:border-zinc-800">
          <h3 className="text-lg font-semibold">Process that ships</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              {
                k: "01",
                t: "Scope",
                d: "Define success metrics, core flows, and constraints. Breakdown into milestones.",
              },
              { k: "02", t: "Design", d: "Component library, states & interactions, review cycles." },
              { k: "03", t: "Build", d: "Iterative delivery with CI, previews, and automated checks." },
              { k: "04", t: "Launch", d: "Observability, post-launch fixes, and handover docs." },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border p-4 dark:border-zinc-800">
                <div className="text-xs text-zinc-500">{s.k}</div>
                <div className="mt-1 text-sm font-semibold">{s.t}</div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold">FAQ</h3>
          <div className="mt-4 divide-y rounded-2xl border dark:divide-zinc-800 dark:border-zinc-800">
            {[
              {
                q: "How do we start?",
                a: "Share scope, deadline, and must-have features. I’ll respond with a plan, milestones, and a fixed/phase-based quote.",
              },
              {
                q: "Tech stack preferences?",
                a: "Next.js 15, TypeScript, Tailwind/Shadcn UI, Node/NestJS, Postgres/Mongo, Stripe, AWS/Docker. Open to team standards.",
              },
              {
                q: "What about maintenance?",
                a: "I offer post-launch support, monitoring setup, and a retainer for iterative improvements.",
              },
            ].map((f) => {
              const open = openFaq === f.q;
              return (
                <details
                  key={f.q}
                  open={open}
                  onToggle={(e) =>
                    setOpenFaq((e.target as HTMLDetailsElement).open ? f.q : null)
                  }
                  className="group p-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between">
                    <span className="text-sm font-medium">{f.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </summary>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{f.a}</p>
                </details>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-md dark:bg-white dark:text-zinc-900"
          >
            Get a proposal <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
