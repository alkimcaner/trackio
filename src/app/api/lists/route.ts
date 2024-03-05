import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Create list
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await auth();

    if (!session || !body.name || !body.description || body.isPrivate == null) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await prisma.list.create({
      data: {
        name: body.name,
        description: body.description,
        isPrivate: body.isPrivate,
        userId: session.user.id,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}
