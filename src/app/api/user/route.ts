import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({});
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        gameLists: true,
      },
    });

    if (!user) {
      return NextResponse.json({});
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened", { status: 500 });
  }
}
