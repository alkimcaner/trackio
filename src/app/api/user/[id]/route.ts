import { auth } from "@/lib/auth";
import { List, PrismaClient, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ListWithUser } from "../../lists/[id]/route";

export type UserWithLists = User & { lists: ListWithUser[] };

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) return NextResponse.json({});

    const session = await auth();

    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        lists: {
          where: {
            userId: params.id,
            OR: [{ isPrivate: false }, { userId: session?.user.id }],
          },
          orderBy: {
            name: "asc",
          },
          include: { User: true },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}
