"use client";

export default function CV() {
  return (
    <section id="cv" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              My CV
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              Click the button below to download my CV.
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-10 flex items-center justify-center">
          <a
           href="/cv/my-cv.pdf"
            download="My_CV" // This will prompt the download with the name "My_CV"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-md dark:bg-white dark:text-zinc-900"
          >
            Download My CV
          </a>
        </div>
      </div>
    </section>
  );
}
