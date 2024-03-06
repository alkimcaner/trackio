import { auth } from "@/lib/auth";
import { List, PrismaClient, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export type ListWithUser = List & { User: User };

// Get list
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    const list = await prisma.list.findUnique({
      where: {
        id: params.id,
        OR: [{ isPrivate: false }, { userId: session?.user.id }],
      },
      include: {
        User: true,
      },
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}

// Update list
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await auth();

    if (
      !session ||
      !body.id ||
      !body.name ||
      !body.description ||
      !body.tags ||
      body.isPrivate == null
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await prisma.list.update({
      where: {
        id: body.id,
        userId: session.user.id,
      },
      data: {
        name: body.name,
        description: body.description,
        tags: body.tags,
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

// Delete list
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || !params.id)
      return new NextResponse("Unauthorized", { status: 401 });

    const result = await prisma.list.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}
