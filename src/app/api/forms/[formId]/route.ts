import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: Promise<{ formId: string }> } 
) {
  const { formId } = await context.params; 
  const id = Number(formId);

  try {
    const result = await prisma.form.findUnique({
      where: {
        id: id,
      },
    });

    if (!result)
      return NextResponse.json({ error: "Form not found" }, { status: 404 });

    const ans = JSON.parse(result.content as string);
    return NextResponse.json(ans);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
