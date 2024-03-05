import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create list
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await auth();

    if (!session || !body.name || !body.description || body.isPrivate == null) {
      return new Response("Unauthorized", { status: 401 });
    }

    const result = await prisma.list.create({
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
