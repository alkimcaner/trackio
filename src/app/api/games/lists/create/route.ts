import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface RequestBody {
  name: string;
  isPublic: boolean;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized access", { status: 500 });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    const createdList = await prisma.gameList.create({
      data: {
        name: body.name,
        isPublic: body.isPublic,
        userId: user?.id,
      },
    });

    return NextResponse.json(createdList);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened", { status: 500 });
  }
}
