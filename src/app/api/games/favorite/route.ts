import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized access", { status: 500 });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 500 });
    }

    if (user.favoriteGameIds.includes(body)) {
      user.favoriteGameIds = user.favoriteGameIds.filter((e) => e !== body);
    } else {
      user.favoriteGameIds.push(body);
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        favoriteGameIds: {
          set: user.favoriteGameIds,
        },
      },
    });

    return NextResponse.json(user.favoriteGameIds);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened", { status: 500 });
  }
}
