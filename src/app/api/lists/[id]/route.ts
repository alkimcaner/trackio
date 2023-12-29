import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { GameList, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const list = await prisma.gameList.findFirst({
      where: {
        id: params.id,
        OR: [{ isPublic: true }, { userId: session?.user.id }],
      },
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened", { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: GameList = await request.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized access", { status: 500 });
    }

    const updatedList = await prisma.gameList.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: body,
    });

    return NextResponse.json(updatedList);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized access", { status: 500 });
    }

    const deletedList = await prisma.gameList.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(deletedList);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened", { status: 500 });
  }
}
