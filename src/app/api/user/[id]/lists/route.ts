import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) return [];

    const session = await auth();

    const lists = await prisma.list.findMany({
      where: {
        userId: params.id,
        OR: [{ isPrivate: false }, { userId: session?.user.id }],
      },
      orderBy: {
        name: "asc",
      },
      include: {
        User: true,
      },
    });

    return Response.json(lists);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 400 });
  }
}
