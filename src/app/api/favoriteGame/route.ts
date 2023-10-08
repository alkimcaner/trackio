import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = String(await request.json());
    const session = await getServerSession(authOptions);
    if (!session)
      return new NextResponse("Unauthorized access.", { status: 500 });

    const email = session.user?.email || "";

    const userData = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userData)
      return new NextResponse("Couldn't find user.", { status: 500 });

    if (userData.favoriteGames.includes(body)) {
      userData.favoriteGames = userData.favoriteGames.filter((e) => e !== body);
    } else {
      userData.favoriteGames.push(body);
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        favoriteGames: {
          set: userData.favoriteGames,
        },
      },
    });

    return NextResponse.json(userData.favoriteGames);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened.", { status: 500 });
  }
}
