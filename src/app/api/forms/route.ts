import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const user = await getServerSession(authOptions);

  if (!user || !user.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { formData } = body as { formData: string };
    const trimmedString = formData.slice(7, -3).trim();

    const form = await prisma.form.create({
      data: {
        content: trimmedString,
        user_id: user.user.id,
      },
    });

    return NextResponse.json(form, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
