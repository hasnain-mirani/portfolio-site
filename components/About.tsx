"use client";


import { CheckCircle2, Sparkles, ShieldCheck, Rocket } from "lucide-react";

type AboutProps = {
  heading?: string;
  blurb?: string;
  highlights?: string[];
  capabilities?: { icon: React.ReactNode; title: string; desc: string }[];
  metrics?: { value: string; label: string }[];
};

export default function About({
  heading = "About Me",
  blurb = `I’m a Full-Stack Engineer focused on building performant, secure, and maintainable products.
I work across front-end (Next.js/React), back-end (Node/Express/Nest), and DevOps (AWS, Docker, CI/CD),
turning business goals into reliable software.`,
  highlights = [
    "Next.js 15 + TypeScript expert",
    "API design & scalable data models",
    "CI/CD, testing, and observability",
    "Stripe, Supabase, MongoDB, Postgres",
  ],
  capabilities = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Product-minded",
      desc: "Translate requirements into UX and technical decisions that move KPIs.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Security-first",
      desc: "Auth, RBAC, input validation, and safe deployments by default.",
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Performance",
      desc: "Edge rendering, caching, lazy-loading, and profiling for speed.",
    },
  ],
  metrics = [
    { value: "20+", label: "Production apps" },
    { value: "5y", label: "Experience" },
    { value: "A–Z", label: "Design → Deploy" },
  ],
}: AboutProps) {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
            {blurb}
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-5">
          {/* Left: Highlights */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border bg-white/60 p-6 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
              <h3 className="text-lg font-semibold">Highlights</h3>
              <ul className="mt-4 space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                    <span className="text-zinc-700 dark:text-zinc-300">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Metrics */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border p-4 text-center dark:border-zinc-800"
                  >
                    <div className="text-xl font-bold">{m.value}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Capability cards */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {capabilities.map((c) => (
                <div
                  key={c.title}
                  className="group rounded-2xl border p-6 transition hover:shadow-md dark:border-zinc-800"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/60">
                    {c.icon}
                  </div>
                  <h4 className="mt-3 text-base font-semibold">{c.title}</h4>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Bio block */}
            <div className="mt-6 rounded-2xl border p-6 dark:border-zinc-800">
              <h4 className="text-base font-semibold">What I’m like to work with</h4>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                I collaborate in short feedback loops, document decisions, and keep reliability
                top of mind. I prefer typed, tested code and clear release notes. You’ll get
                daily progress updates and deployable increments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
