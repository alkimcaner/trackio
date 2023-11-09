import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return new NextResponse("Unauthorized access.", { status: 500 });

    const email = session.user?.email || "";

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return new NextResponse("Couldn't find user.", { status: 500 });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened.", { status: 500 });
  }
}
