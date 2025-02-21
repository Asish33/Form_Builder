import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Use .json() to parse the body in App Router
    const { formData } = body as { formData: object };

    const form = await prisma.form.create({
      data: {
        content: formData,
      },
    });

    return NextResponse.json(form, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
