import { prisma } from "@/lib/prisma";
import WorksClient from "@/components/WorksClient";

function normalizeImage(src?: string) {
  if (!src) return "/placeholder.jpg"; // make sure this exists in /public
  // Remote URL?
  if (src.startsWith("http://") || src.startsWith("https://")) {
    try {
      new URL(src); // validate
      return src;
    } catch {
      return "/placeholder.jpg";
    }
  }
  // Local file in /public: must start with a leading slash
  return src.startsWith("/") ? src : `/${src}`;
}

export default async function Works() {
  const rows = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const projects = rows.map((p) => ({
    ...p,
    tags: Array.isArray(p.tags) ? (p.tags as string[]) : [],
    image: normalizeImage(p.image),
  }));

  return <WorksClient projects={projects} />;
}
