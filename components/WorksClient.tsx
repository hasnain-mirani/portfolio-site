"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  blurb: string;
  image: string; // put images in /public/projects/* or allow remote domains in next.config
  tags: string[];
  live?: string | null;
  repo?: string | null;
  year?: number | null;
  featured: boolean;
};

// --- STATIC DATA (edit freely) ---
const PROJECTS: Project[] = [
  {
    id: "xtreamtv",
    title: "XtreamTV — IPTV Subscription Platform",
    blurb:
      "End‑to‑end IPTV storefront with Stripe billing, device pairing, and admin analytics.",
    image: "/projects/xtreamtv.png",
    tags: ["Next.js", "Node", "MongoDB", "Stripe"],
    live: "https://www.xtremetv.live/",
    repo: null,
    year: 2025,
    featured: true,
  },
  {
    id: "reneewallet",
    title: "ReneeWallet — Multi‑chain Crypto Wallet",
    blurb:
      "Cold/multisig flows, Solana/Tron integrations, secure signing, and activity monitoring.",
    image: "/projects/reneewallet.png",
    tags: ["Solana", "Tron", "Next.js", "Supabase"],
    live: null,
    repo: "https://github.com/hasnain-mirani/frontend_renee_wallet",
    year: 2025,
    featured: true,
  },
  {
    id: "truckvise",
    title: "Truckvise — Dispatch & Logistics SaaS",
    blurb:
      "Driver/load management, role‑based dashboards, smart status updates, and PDF invoices.",
    image: "/projects/truckvise.png",
    tags: ["MERN", "RBAC", "PDFKit", "AWS"],
    live: null,
    repo: "https://github.com/hasnain-mirani/Truck_dispatching",
    year: 2024,
    featured: false,
  },
  {
    id: "umrah",
    title: "Umrah Booking Portal",
    blurb:
      "Packages, booking workflows, agents panel, and automated receipt/invoice PDFs.",
    image: "/projects/umrah.png",
    tags: ["Next.js", "Prisma", "Postgres", "PDFKit"],
    live: "https://miqattravels.com/",
    repo: null,
    year: 2024,
    featured: false,
  },
  {
    id: "ai-resume",
    title: "AI Resume/Cover Letter Generator",
    blurb:
      "LLM‑powered prompts, templates, and export to PDF/DOCX with user‑saved profiles.",
    image: "/projects/ai-resume.png",
    tags: ["Next.js", "Stripe", "Clerk", "OpenAI"],
    live: "https://ai-resume.example.com",
    repo: "https://github.com/youruser/ai-resume",
    year: 2025,
    featured: false,
  },
  {
    id: "fb-automation",
    title: "Facebook Marketplace Automation (Desktop Bot)",
    blurb:
      "Electron + Python tooling for listing automation, image prep, and status tracking.",
    image: "/projects/fb-automation.png",
    tags: ["Electron", "Python", "Playwright", "Selenium"],
    live: null,
    repo: "https://github.com/hasnain-mirani/facebook_autobot",
    year: 2025,
    featured: false,
  },
];

export default function Works() {
  const projects = PROJECTS; // static
  return (
    <section id="works" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Selected Work</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">Real-world products shipped with measurable impact.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl border bg-white/60 backdrop-blur transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  {p.year && (
                    <span className="rounded-lg border px-2 py-0.5 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                      {p.year}
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">{p.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-2 py-0.5 text-[11px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                      <ExternalLink className="h-4 w-4" /> Live
                    </a>
                  )}
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                      <Github className="h-4 w-4" /> Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
