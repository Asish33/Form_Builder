import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, fields } = body;

    if (!id || !fields) {
      return NextResponse.json(
        { error: "ID and fields are required" },
        { status: 400 }
      );
    }

    
    const existingForm = await prisma.form.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingForm) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const content =
      typeof existingForm.content === "string"
        ? JSON.parse(existingForm.content)
        : existingForm.content;

    content.fields = JSON.stringify(fields); 
   
    const updatedForm = await prisma.form.update({
      where: {
        id: Number(id),
      },
      data: {
        content: JSON.stringify(content), 
      },
    });

    return NextResponse.json(updatedForm, { status: 200 });
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
