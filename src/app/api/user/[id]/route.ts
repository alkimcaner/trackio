import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await auth();

    if (!session) return new Response("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    return Response.json(user);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 400 });
  }
}
