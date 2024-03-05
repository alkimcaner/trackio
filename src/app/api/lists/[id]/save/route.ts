import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const session = await auth();

    if (!session || params.id == null || body.gameId == null)
      return new NextResponse("Unauthorized", { status: 401 });

    const list = await prisma.list.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!list) return new NextResponse("List not found", { status: 400 });

    let items = list.items;

    if (items.includes(body.gameId)) {
      items = items.filter((id) => id !== body.gameId);
    } else {
      items.push(body.gameId);
    }

    const result = await prisma.list.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: {
        items: items,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}