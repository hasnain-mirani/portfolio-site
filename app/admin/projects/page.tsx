"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import UploadImage from "@/components/UploadImage";
import UploadGallery from "@/components/UploadGallery";

type Project = {
  id: string;
  title: string;
  slug: string;
  blurb: string;
  image: string;         // cover image
  tags: string[];
  images?: string[];     // ✅ NEW: gallery images
  live?: string | null;
  repo?: string | null;
  year?: number | null;
  featured: boolean;
};

const emptyForm: Omit<Project, "id"> = {
  title: "",
  slug: "",
  blurb: "",
  image: "",
  tags: [],
  images: [],            // ✅ NEW
  live: "",
  repo: "",
  year: undefined as any,
  featured: false,
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.slug.toLowerCase().includes(s) ||
        p.tags.join(",").toLowerCase().includes(s)
    );
  }, [items, q]);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/projects", { cache: "no-store" });
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startCreate() {
    setEditing(null);
    setForm(emptyForm);
  }

function startEdit(p: Project) {
  setEditing(p);
  setForm({
    title: p.title,
    slug: p.slug,
    blurb: p.blurb,
    image: p.image,
    tags: p.tags,
    images: Array.isArray(p.images) ? p.images : [],  // ✅ NEW
    live: p.live ?? "",
    repo: p.repo ?? "",
    year: p.year ?? (undefined as any),
    featured: p.featured,
  });
}

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/projects/${editing.id}` : "/api/projects";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: (form.tags ?? []).filter(Boolean),
        year: form.year ? Number(form.year) : undefined,
         images: (form.images ?? []).filter(Boolean), 
        live: form.live || null,
        repo: form.repo || null,
      }),
    });
    setSaving(false);
    if (!res.ok) return alert("Save failed");
    await load();
    startCreate();
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("Delete failed");
    await load();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold">Admin • Projects</h1>
          <p className="text-sm text-zinc-500">Create, edit, and publish your work.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="rounded-xl border px-3 py-2 text-sm dark:border-zinc-700"
          />
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            <Plus className="h-4 w-4" /> New
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSave} className="rounded-2xl border p-4 md:p-6 dark:border-zinc-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 h-10 w-full rounded-xl border px-3 dark:border-zinc-700"
              placeholder="XtreamTV — IPTV Platform"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="mt-1 h-10 w-full rounded-xl border px-3 dark:border-zinc-700"
              placeholder="xtreamtv"
              required
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-sm font-medium">Blurb</label>
            <textarea
              value={form.blurb}
              onChange={(e) => setForm({ ...form, blurb: e.target.value })}
              className="mt-1 w-full rounded-xl border px-3 py-2 dark:border-zinc-700"
              rows={3}
              placeholder="Subscription flows, payments, admin analytics…"
              required
            />
          </div>
<div className="md:col-span-2">
  <UploadImage
    existingUrl={form.image}
    onUploaded={(url) => setForm({ ...form, image: url })}
    label="Cover image"
  />
  <label className="mt-4 block text-sm font-medium">Cover image URL (optional override)</label>
  <input
    value={form.image}
    onChange={(e) => setForm({ ...form, image: e.target.value })}
    className="mt-1 h-10 w-full rounded-xl border px-3 dark:border-zinc-700"
    placeholder="/projects/cover.jpg or https://"
  />
</div>
<div className="md:col-span-3">
  <UploadGallery
    value={form.images ?? []}
    onChange={(urls) => setForm({ ...form, images: urls })}
    label="Gallery images"
    max={8}
  />
</div>

          <div>
            <label className="text-sm font-medium">Year</label>
            <input
              type="number"
              value={form.year ?? ""}
              onChange={(e) => setForm({ ...form, year: e.target.value as any })}
              className="mt-1 h-10 w-full rounded-xl border px-3 dark:border-zinc-700"
              placeholder="2025"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tags (comma)</label>
            <input
              value={(form.tags ?? []).join(", ")}
              onChange={(e) =>
                setForm({ ...form, tags: e.target.value.split(",").map((t) => t.trim()) })
              }
              className="mt-1 h-10 w-full rounded-xl border px-3 dark:border-zinc-700"
              placeholder="Next.js, Stripe, SaaS"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Live URL</label>
            <input
              value={form.live ?? ""}
              onChange={(e) => setForm({ ...form, live: e.target.value })}
              className="mt-1 h-10 w-full rounded-xl border px-3 dark:border-zinc-700"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Repo URL</label>
            <input
              value={form.repo ?? ""}
              onChange={(e) => setForm({ ...form, repo: e.target.value })}
              className="mt-1 h-10 w-full rounded-xl border px-3 dark:border-zinc-700"
              placeholder="https://github.com/..."
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            <span className="text-sm">Featured</span>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70 dark:bg-white dark:text-zinc-900"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {editing ? "Update" : "Create"}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : (
          filtered.map((p) => (
            <div key={p.id} className="rounded-2xl border p-4 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="rounded-xl border px-2 py-1 text-xs hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="inline-flex items-center gap-1 rounded-xl border px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-zinc-700 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
              <div className="mt-1 text-xs text-zinc-500">{p.slug}</div>
              <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">{p.blurb}</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border px-2 py-0.5 text-[11px] dark:border-zinc-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
