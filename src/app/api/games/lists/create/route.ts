import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface RequestBody {
  name: string;
  public: boolean;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized access.", { status: 500 });
    }

    const email = session.user?.email || "";

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    await prisma.gameList.create({
      data: {
        name: body.name,
        public: body.public,
        userId: user?.id,
      },
    });

    return NextResponse.json(body);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened.", { status: 500 });
  }
}
