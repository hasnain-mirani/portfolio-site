"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, Moon, Sun, Github, Linkedin, Mail } from "lucide-react";
import useActiveSection from "@/hooks/useActiveSection";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return saved ? saved === "dark" : prefersDark;
  });

  // sections in your page
  const sections = useMemo(
    () => ["home", "about", "services", "works", "resume", "contact"],
    []
  );
  const active = useActiveSection({
    ids: sections,
    rootMargin: "-40% 0px -55% 0px",
  });

  // hydrate theme
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !isDark;
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const nav = [
    { href: "#home", id: "home", label: "Home" },
    { href: "#about", id: "about", label: "About" },
    { href: "#services", id: "services", label: "Services" },
    { href: "#works", id: "works", label: "Works" },
    { href: "#resume", id: "resume", label: "Resume" },
    { href: "#contact", id: "contact", label: "Contact" },
  ];

  // ---- Animated underline logic ----
  const navWrapRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [underline, setUnderline] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const el = linkRefs.current[active];
    const wrap = navWrapRef.current;
    if (!el || !wrap) return;

    // Measure in relation to the wrapper
    const wrapRect = wrap.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const left = rect.left - wrapRect.left;
    const width = rect.width;

    // Use transform-based animation (smooth)
    setUnderline({ left, width });
  }, [active]);

  // recompute on resize
  useEffect(() => {
    const onResize = () => {
      const el = linkRefs.current[active];
      const wrap = navWrapRef.current;
      if (!el || !wrap) return;
      const wrapRect = wrap.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setUnderline({ left: rect.left - wrapRect.left, width: rect.width });
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  const linkCls = (id: string) =>
    `relative z-10 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:text-fuchsia-600 dark:hover:text-fuchsia-400 ${
      active === id
        ? "text-fuchsia-600 dark:text-fuchsia-400"
        : "text-zinc-700 dark:text-zinc-200"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 rounded-2xl border border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:border-zinc-800/60 dark:bg-zinc-900/60">
          <div className="flex items-center justify-between px-4 py-3">
          

            {/* Desktop nav with underline */}
            <div className="relative hidden md:block">
              <div ref={navWrapRef} className="relative flex items-center gap-1">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    ref={(el) => { linkRefs.current[item.id] = el; }}
                    className={linkCls(item.id)}
                    aria-current={active === item.id ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                ))}

                {/* underline track */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800/70" />
                {/* animated indicator */}
                <div
                  className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-[transform,width] duration-300 ease-out"
                  style={{
                    width: underline?.width ?? 0,
                    transform: `translateX(${underline?.left ?? 0}px)`,
                  }}
                />
              </div>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/hasnain-mirani"
                target="_blank"
                className="hidden rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 md:inline-flex"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-hasnain-mirani"
                target="_blank"
                className="hidden rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 md:inline-flex"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hasnainmirani1122@gmail.com"
                className="hidden rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 md:inline-flex"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>

              <button
                onClick={toggleTheme}
                className="rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                className="inline-flex rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-80 translate-x-full bg-white shadow-xl transition-transform dark:bg-zinc-950 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b px-4 py-4 dark:border-zinc-800">
          <span className="text-lg font-semibold dark:text-white">Menu</span>
          <button
            className="rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-3 py-3 text-sm font-medium ${
                active === item.id
                  ? "text-fuchsia-600 dark:text-fuchsia-400"
                  : "text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
              }`}
              aria-current={active === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </header>
  );
}
