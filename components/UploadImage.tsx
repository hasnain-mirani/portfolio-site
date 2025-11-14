"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing"; // ⬅️ your generated hook

export default function UploadImage({
  onUploaded,
  existingUrl,
  label = "Upload image",
}: {
  onUploaded: (url: string) => void;
  existingUrl?: string;
  label?: string;
}) {
  const { startUpload, isUploading } = useUploadThing("projectImage"); // endpoint must match your router
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [preview, setPreview] = useState(existingUrl || "");
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handlePick(e: React.ChangeEvent<HTMLInputElement>) {
    setErr(null);
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    setBusy(true);
    setProgress(0);

    const res = await startUpload(files, {
      onUploadProgress: (p) => setProgress(Math.max(0, Math.min(100, p))),
    });

    setBusy(false);

    if (!res?.length) {
      setErr("Upload failed. Please try again.");
      return;
    }

    const url = res[0].url;
    setPreview(url);
    onUploaded(url);
  }

  return (
    <div className="rounded-xl border p-4 dark:border-zinc-800">
      <div className="mb-2 text-sm font-medium">{label}</div>

      {/* Preview */}
      {preview && (
        <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-xl border dark:border-zinc-800">
          <Image src={preview} alt="Preview" fill className="object-cover" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-700 dark:hover:bg-zinc-900"
          disabled={busy || isUploading}
        >
          {preview ? "Replace image" : "Choose image"}
        </button>

        {(busy || isUploading) && (
          <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
          </span>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePick}
      />

      {/* Progress bar */}
      {(busy || isUploading) && (
        <div className="mt-3 h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-[width] duration-150"
            style={{ width: `${Math.max(2, progress)}%` }}
          />
        </div>
      )}

      {/* Helper + error */}
      <p className="mt-2 text-xs text-zinc-500">
        PNG/JPG up to 4MB. After upload, the image preview updates automatically.
      </p>
      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
    </div>
  );
}
