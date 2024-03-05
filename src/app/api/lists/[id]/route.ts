import { auth } from "@/lib/auth";
import { List, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export type ListWithUser = List & { User: User };

// Get list
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    const list = await prisma.list.findUnique({
      where: {
        id: params.id,
        OR: [{ isPrivate: false }, { userId: session?.user.id }],
      },
      include: {
        User: true,
      },
    });

    return Response.json(list);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 400 });
  }
}

// Update list
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const session = await auth();

    if (
      !session ||
      !body.id ||
      !body.name ||
      !body.description ||
      body.isPrivate == null
    ) {
      return new Response("Unauthorized", { status: 401 });
    }

    const result = await prisma.list.update({
      where: {
        id: body.id,
        userId: session.user.id,
      },
      data: {
        name: body.name,
        description: body.description,
        isPrivate: body.isPrivate,
        userId: session.user.id,
      },
    });

    return Response.json(result);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 400 });
  }
}

// Delete list
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || !params.id)
      return new Response("Unauthorized", { status: 401 });

    const result = await prisma.list.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    return Response.json(result);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 400 });
  }
}
