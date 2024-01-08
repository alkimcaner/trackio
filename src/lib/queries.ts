import { auth } from "./auth";
import { prisma } from "./prisma";

export type ListWithUser = NonNullable<Awaited<ReturnType<typeof getList>>>;

export const getGames = async (query: string) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Client-ID": process.env.IGDB_ID ?? "",
        Authorization: `Bearer ${process.env.IGDB_TOKEN}`,
      },
      body: query,
    };

    const res = await fetch("https://api.igdb.com/v4/games", options);

    return res.json();
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getGamesById = async (gameIds?: string[]) => {
  try {
    if (!gameIds?.length) {
      return [];
    }

    const options = {
      method: "POST",
      headers: {
        "Client-ID": process.env.IGDB_ID ?? "",
        Authorization: `Bearer ${process.env.IGDB_TOKEN}`,
      },
      body: `fields *,cover.*; where id = (${gameIds.join(",")}); limit 500;`,
    };

    const res = await fetch("https://api.igdb.com/v4/games", options);

    return res.json();
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getUserLists = async (userId: string) => {
  try {
    const session = await auth();

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
    const session = await auth();

    const list = await prisma.list.findFirst({
      where: {
        id: listId,
        OR: [{ isPrivate: false }, { userId: session?.user.id }],
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
    const session = await auth();

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
