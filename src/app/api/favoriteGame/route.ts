import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = String(await request.json());
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized access." });

    const email = session.user?.email || "";

    const userData = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userData) return NextResponse.json({ error: "Couldn't find user." });

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
    return NextResponse.json({ error: "Something unexpected happened." });
  }
}
