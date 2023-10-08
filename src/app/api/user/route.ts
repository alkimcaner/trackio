import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized access." });

    const email = session.user?.email || "";

    const userData = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userData) return NextResponse.json({ error: "Couldn't find user." });

    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
