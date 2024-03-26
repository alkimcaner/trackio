import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const itemType = searchParams.get("itemType");
    const itemId = searchParams.get("itemId");
    const userId = searchParams.get("userId");

    const reviews = await prisma.review.findMany({
      where: {
        itemType: itemType || undefined,
        itemId: itemId || undefined,
        userId: userId || undefined,
      },
      include: {
        User: true,
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await auth();

    if (
      !session ||
      !body.text ||
      body.score == null ||
      !body.itemType ||
      !body.itemId
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await prisma.review.create({
      data: {
        text: body.text,
        score: body.score,
        itemType: body.itemType,
        itemId: body.itemId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await auth();

    if (!session || !body.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const review = await prisma.review.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!review) {
      return new NextResponse("Review not found", { status: 400 });
    }

    if (review.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await prisma.review.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}
