"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

type FooterProps = {
  name?: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  nav?: { href: string; label: string }[];
};

export default function Footer({
  name = "Hasnain",
  email = "hello@example.com",
  githubUrl = "https://github.com/",
  linkedinUrl = "https://www.linkedin.com/",
  nav = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#works", label: "Works" },
    { href: "#resume", label: "Resume" },
    { href: "#contact", label: "Contact" },
  ],
}: FooterProps) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-16 border-t py-10 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top row */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <div className="text-lg font-semibold">
              {name} <span className="text-fuchsia-500">•</span> Portfolio
            </div>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Building modern, production-grade apps with Next.js & TypeScript.
            </p>
          </div>

          {/* Quick nav */}
          <nav className="flex flex-wrap items-center justify-center gap-3">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-lg px-2 py-1 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
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
              href={`mailto:${email}`}
              aria-label="Email"
              className="rounded-xl border p-2 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-zinc-500 dark:border-zinc-800 md:flex-row">
          <p>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <button
            onClick={toTop}
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            <ArrowUp className="h-4 w-4" />
            Back to top
          </button>
        </div>
      </div>

      {/* Floating to-top button for long pages */}
      <button
        onClick={toTop}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/80 shadow-md backdrop-blur transition-opacity dark:border-zinc-700 dark:bg-zinc-900/80 ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
