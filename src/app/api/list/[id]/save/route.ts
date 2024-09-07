import { auth } from "@/lib/auth";
import { ListType } from "@/types/list";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: { id: string; type: ListType } = await req.json();

    const session = await auth();

    if (!session || params.id == null || body.id == null)
      return new NextResponse("Unauthorized", { status: 401 });

    const list = await prisma.list.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!list) return new NextResponse("List not found", { status: 400 });

    if (body.type === ListType.Game) {
      let gameIds = list.gameIds;

      if (gameIds.includes(body.id)) {
        gameIds = gameIds.filter((id) => id !== body.id);
      } else {
        gameIds.push(body.id);
      }

      await prisma.list.update({
        where: {
          id: params.id,
          userId: session.user.id,
        },
        data: {
          gameIds: gameIds,
        },
      });
    } else if (body.type === ListType.Movie) {
      let movieIds = list.movieIds;

      if (movieIds.includes(body.id)) {
        movieIds = movieIds.filter((id) => id !== body.id);
      } else {
        movieIds.push(body.id);
      }

      await prisma.list.update({
        where: {
          id: params.id,
          userId: session.user.id,
        },
        data: {
          movieIds: movieIds,
        },
      });
    } else if (body.type === ListType.TV) {
      let tvIds = list.tvIds;

      if (tvIds.includes(body.id)) {
        tvIds = tvIds.filter((id) => id !== body.id);
      } else {
        tvIds.push(body.id);
      }

      await prisma.list.update({
        where: {
          id: params.id,
          userId: session.user.id,
        },
        data: {
          tvIds: tvIds,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}
