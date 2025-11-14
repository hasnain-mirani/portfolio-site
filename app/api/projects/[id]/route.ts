import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  try {
    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: body.title,
        slug: body.slug,
        blurb: body.blurb,
        image: body.image,
        tags: body.tags ?? [],
        live: body.live ?? null,
        repo: body.repo ?? null,
        year: body.year ? Number(body.year) : null,
        featured: !!body.featured,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
