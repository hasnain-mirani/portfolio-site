"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Loader2, CheckCircle2, XCircle } from "lucide-react";

type ContactProps = {
  heading?: string;
  sub?: string;
  email?: string;
  phone?: string;
  location?: string;
  apiEndpoint?: string; // e.g. "/api/contact"
};

export default function Contact({
  heading = "Let’s talk",
  sub = "Have a project in mind? Share a few details and I’ll reply within 24 hours.",
  email = "hasnainmirani1122@gmail.com",
  phone = "+92 3029453605",
  location = "Lahore, Pakistan",
  apiEndpoint = "/api/contact",
}: ContactProps) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null);
    setErr(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    // basic validation
    if (!payload.name || !payload.email || !payload.message) {
      setErr("Please fill name, email, and message.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      setOk("Thanks! Your message has been sent.");
      (e.target as HTMLFormElement).reset();
    } catch (e: any) {
      setErr("Something went wrong. You can also email me directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">{sub}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Contact details */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border bg-white/60 p-6 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
              <h3 className="text-lg font-semibold">Contact details</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <a className="hover:underline" href={`mailto:${email}`}>{email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <a className="hover:underline" href={`tel:${phone.replace(/\\s+/g, "")}`}>
                    {phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>{location}</span>
                </li>
              </ul>

              <div className="mt-6 rounded-xl border p-4 text-sm dark:border-zinc-800">
                <p className="text-zinc-600 dark:text-zinc-300">
                  Prefer email? Send directly to <a className="font-medium hover:underline" href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border p-6 dark:border-zinc-800"
              aria-describedby="contact-status"
            >
              {/* status alerts */}
              {ok && (
                <div
                  id="contact-status"
                  role="status"
                  className="mb-4 inline-flex w-full items-center gap-2 rounded-xl border border-emerald-300/60 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-900/30 dark:text-emerald-200"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {ok}
                </div>
              )}
              {err && (
                <div
                  id="contact-status"
                  role="alert"
                  className="mb-4 inline-flex w-full items-center gap-2 rounded-xl border border-red-300/60 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-900/30 dark:text-red-200"
                >
                  <XCircle className="h-4 w-4" />
                  {err}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="h-11 w-full rounded-xl border bg-white/70 px-3 backdrop-blur placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-xl border bg-white/70 px-3 backdrop-blur placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    placeholder="Project inquiry"
                    className="h-11 w-full rounded-xl border bg-white/70 px-3 backdrop-blur placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="mb-1 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me a bit about your project, timeline, and budget…"
                    rows={6}
                    className="w-full rounded-xl border bg-white/70 px-3 py-2 backdrop-blur placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-xs text-zinc-500">
                  By sending, you agree to be contacted about your request.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-md disabled:opacity-70 dark:bg-white dark:text-zinc-900"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>Send message</>
                  )}
                </button>
              </div>
            </form>

            {/* Optional hint to wire API */}
            {/* Create /app/api/contact/route.ts (Next.js App Router):
              import { NextResponse } from "next/server";
              export async function POST(req: Request) {
                const data = await req.json();
                // TODO: send email (Resend/SendGrid) or write to DB/Slack
                return NextResponse.json({ ok: true });
              }
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
