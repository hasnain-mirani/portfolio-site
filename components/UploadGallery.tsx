"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/utils/uploadthing"; // your generated hook
import { GripVertical, Trash2, Loader2 } from "lucide-react";

type FileRow = { id: string; file: File; progress: number; url?: string; error?: string; };

export default function UploadGalleryPro({
  value, onChange, label = "Gallery images", max = 8,
}: { value: string[]; onChange: (urls: string[]) => void; label?: string; max?: number; }) {
  const { startUpload, isUploading } = useUploadThing("projectGallery");
  const [rows, setRows] = useState<FileRow[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragging = useRef<number | null>(null);

  const all = useMemo(() => {
    const uploaded = rows.filter(r => r.url).map(r => r.url!) as string[];
    return Array.from(new Set([...(value || []), ...uploaded])).slice(0, max);
  }, [rows, value, max]);

  const pickFiles = () => inputRef.current?.click();

  const handleFiles = useCallback(async (filesList: FileList | null) => {
    if (!filesList?.length) return;
    const remain = Math.max(0, max - all.length);
    const files = Array.from(filesList).slice(0, remain);
    if (!files.length) return;

    const seed: FileRow[] = files.map(f => ({ id: crypto.randomUUID(), file: f, progress: 0 }));
    setRows(prev => [...prev, ...seed]);

    const res = await startUpload(files, {
      onUploadProgress: (p) => {
        setRows(prev => {
          if (!prev.length) return prev;
          const idx = prev.findIndex(r => r.progress < 100 && !r.url && !r.error);
          const i = idx === -1 ? prev.length - 1 : idx;
          const copy = [...prev];
          copy[i] = { ...copy[i], progress: Math.max(0, Math.min(100, p)) };
          return copy;
        });
      },
    });

    if (!res) {
      setRows(prev => prev.map(r => (seed.some(s => s.id === r.id) ? { ...r, error: "Upload failed" } : r)));
      return;
    }

    setRows(prev => {
      const copy = [...prev];
      for (let i = 0; i < res.length; i++) {
        const uploaded = res[i];
        const seedIdx = prev.findIndex(r => r.file === files[i]);
        if (seedIdx !== -1) copy[seedIdx] = { ...copy[seedIdx], url: uploaded.url, progress: 100 };
      }
      return copy;
    });

    const urls = res.map(r => r.url);
    onChange(Array.from(new Set([...(value || []), ...urls])).slice(0, max));
  }, [all.length, max, onChange, startUpload, value]);

  const removeAt = (i: number) => { const out = [...all]; out.splice(i, 1); onChange(out); };
  const onDragStart = (i: number) => (e: React.DragEvent) => { dragging.current = i; e.dataTransfer.effectAllowed = "move"; };
  const onDragOver = (i: number) => (e: React.DragEvent) => { e.preventDefault(); const from = dragging.current; if (from===null||from===i) return; const copy=[...all]; const [m]=copy.splice(from,1); copy.splice(i,0,m); dragging.current=i; onChange(copy); };
  const onDragEnd = () => { dragging.current = null; };

  return (
    <div className="rounded-xl border p-4 dark:border-zinc-800">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium">{label}</div>
        <button
          type="button"
          onClick={pickFiles}
          className="rounded-xl border px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          {isUploading ? "Uploading…" : "Add images"}
        </button>
      </div>

      <input
        ref={inputRef} type="file" accept="image/*" multiple className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {all.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {all.map((src, i) => (
            <div key={`${src}-${i}`}
              className="group relative overflow-hidden rounded-xl border dark:border-zinc-800"
              draggable onDragStart={onDragStart(i)} onDragOver={onDragOver(i)} onDragEnd={onDragEnd}
              title="Drag to reorder">
              <div className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-lg bg-white/80 px-2 py-1 text-xs text-zinc-700 shadow-sm backdrop-blur dark:bg-zinc-900/80 dark:text-zinc-200">
                <GripVertical className="h-3.5 w-3.5" /> {i + 1}
              </div>
              <button type="button" onClick={() => removeAt(i)}
                className="absolute right-2 top-2 z-10 rounded-lg bg-white/85 p-1 text-red-600 opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 dark:bg-zinc-900/85"
                title="Remove">
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="relative aspect-[4/3] w-full">
                <Image src={src} alt={`Gallery image ${i + 1}`} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      )}

      {rows.some(r => !r.url) && (
        <div className="space-y-2">
          {rows.filter(r => !r.url).map(r => (
            <div key={r.id} className="rounded-lg border p-2 text-xs dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="truncate pr-2">{r.file.name}</span>
                <span className="inline-flex items-center gap-1 tabular-nums">
                  {r.progress < 100 && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {Math.round(r.progress)}%
                </span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-[width] duration-150"
                  style={{ width: `${Math.max(2, r.progress)}%` }}
                />
              </div>
              {r.error && <div className="mt-1 text-red-600">{r.error}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
