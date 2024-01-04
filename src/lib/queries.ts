import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export type ListWithUser = NonNullable<Awaited<ReturnType<typeof getList>>>;

export const getGames = async (gameIds?: string[]) => {
  if (!gameIds?.length) {
    return [];
  }

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/games`, {
    method: "POST",
    body: `fields *,cover.*; where id = (${gameIds.join(",")}); limit 500;`,
  });

  return res.json();
};

export const getUserLists = async (userId: string) => {
  try {
    const session = await getServerSession(authOptions);

    const lists = await prisma.list.findMany({
      where: {
        userId: userId,
        OR: [{ isPrivate: true }, { userId: session?.user.id }],
      },
      include: {
        User: true,
      },
    });

    return lists;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getList = async (listId: string) => {
  try {
    const session = await getServerSession(authOptions);

    const list = await prisma.list.findFirst({
      where: {
        id: listId,
        OR: [{ isPrivate: true }, { userId: session?.user.id }],
      },
      include: {
        User: true,
      },
    });

    return list;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return;

    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return;
  }
};
