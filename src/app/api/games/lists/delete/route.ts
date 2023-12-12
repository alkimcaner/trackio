import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface RequestBody {
  id: string;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized access", { status: 500 });
    }

    const deletedList = await prisma.gameList.delete({
      where: {
        id: body.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(deletedList);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened", { status: 500 });
  }
}
