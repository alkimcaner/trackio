import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) return NextResponse.json([]);

    const session = await auth();

    const lists = await prisma.list.findMany({
      where: {
        userId: params.id,
        OR: [{ isPrivate: false }, { userId: session?.user.id }],
      },
      orderBy: {
        name: "asc",
      },
      include: {
        User: true,
      },
    });

    return NextResponse.json(lists);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}
