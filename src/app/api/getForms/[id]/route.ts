import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } 
) {
  const { id } = await params; 
  const response = await prisma.form.findMany({
    where:{
      user_id:Number(id)
    }
  })
  return NextResponse.json({
    forms: response,
    id: Number(id), 
  });
}
