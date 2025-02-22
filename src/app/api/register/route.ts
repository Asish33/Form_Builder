import { authOptions } from "@/lib/authoptions";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req:NextRequest) {
    const session =await  getServerSession(authOptions)
    console.log(session);
    const body = await req.json();
    const user = await prisma.user.create({
        data:{
            password:body.password,
            email:body.email,
            firstName:body.firstName,
            lastName:body.lastName,
        }
    })
    return NextResponse.json({
        message:"registered"
    },{status:200})
}
