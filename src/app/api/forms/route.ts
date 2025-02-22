import { authOptions } from "@/lib/authoptions";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const user = await getServerSession(authOptions);
  console.log(user);
  try {
    const body = await req.json(); 
    const { formData } = body as { formData: object };

    const form = await prisma.form.create({
  data: {
    content: formData,
    user_id: user?.user.id,
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
