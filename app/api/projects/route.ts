import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const ProjectCreate = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  blurb: z.string().min(2),
  image: z.string().min(1),
  tags: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  live: z.string().url().optional().or(z.literal("")).transform(v => v || undefined),
  repo: z.string().url().optional().or(z.literal("")).transform(v => v || undefined),
  year: z.coerce.number().int().optional(),
  featured: z.boolean().optional().default(false),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = ProjectCreate.parse(json);

    const created = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        blurb: data.blurb,
        image: data.image,
        tags: data.tags as unknown as Prisma.InputJsonValue,
        images: data.images as unknown as Prisma.InputJsonValue,
        live: data.live ?? null,
        repo: data.repo ?? null,
        year: data.year ?? null,
        featured: data.featured,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    // Zod error → 400 with details; Prisma unique errors → 409; anything else → 500
    if (err?.name === "ZodError") {
      return NextResponse.json({ error: "Validation failed", issues: err.issues }, { status: 400 });
    }
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "Slug must be unique" }, { status: 409 });
    }
    console.error("POST /api/projects failed", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
