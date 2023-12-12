import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const list = await prisma.gameList.findFirst({
      where: {
        id: params.id,
      },
    });

    if (list?.userId === session?.user.id || list?.isPublic) {
      return NextResponse.json(list);
    } else {
      return NextResponse.json({});
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Something unexpected happened", { status: 500 });
  }
}
