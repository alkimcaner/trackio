"use server";

import { PrismaClient, List } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "./auth";

const prisma = new PrismaClient();

export type ListWithUser = NonNullable<Awaited<ReturnType<typeof getList>>>;

export const getGames = async (query: string) => {
  try {
    if (!query) return [];

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
      body: `fields *,cover.*; where id = (${gameIds.join(
        ","
      )}); sort name asc; limit 500;`,
    };

    const res = await fetch("https://api.igdb.com/v4/games", options);

    return res.json();
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

export const getUserLists = async (userId?: string) => {
  try {
    if (!userId) return [];

    const session = await auth();

    const lists = await prisma.list.findMany({
      where: {
        userId: userId,
        OR: [{ isPrivate: false }, { userId: session?.user.id }],
      },
      orderBy: {
        name: "asc",
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

export const deleteList = async (listId: string) => {
  let session;

  try {
    session = await auth();

    if (!session || !listId) return;

    await prisma.list.delete({
      where: {
        id: listId,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.error(error);
    return;
  } finally {
    if (!!session) {
      redirect(`/user/${session.user.id}/lists`);
    }
  }
};

export const createList = async (formData: FormData) => {
  let session;

  try {
    const payload = {
      name: formData.get("name")?.toString(),
      description: formData.get("description")?.toString(),
      isPrivate: !!formData.get("isPrivate")?.toString(),
    };

    session = await auth();

    if (
      !session ||
      !payload.name ||
      !payload.description ||
      payload.isPrivate == null
    ) {
      return;
    }

    await prisma.list.create({
      data: {
        name: payload.name,
        description: payload.description,
        isPrivate: payload.isPrivate,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.error(error);
    return;
  } finally {
    if (!!session) {
      redirect(`/user/${session.user.id}/lists`);
    }
  }
};

export const updateList = async (formData: FormData) => {
  let session;

  try {
    const payload = {
      id: formData.get("listId")?.toString(),
      name: formData.get("name")?.toString(),
      description: formData.get("description")?.toString(),
      isPrivate: !!formData.get("isPrivate")?.toString(),
    };

    session = await auth();

    if (
      !session ||
      !payload.id ||
      !payload.name ||
      !payload.description ||
      payload.isPrivate == null
    ) {
      return;
    }

    await prisma.list.update({
      where: {
        id: payload.id,
        userId: session.user.id,
      },
      data: {
        name: payload.name,
        description: payload.description,
        isPrivate: payload.isPrivate,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.error(error);
    return;
  } finally {
    if (!!session) {
      redirect(`/lists/${formData.get("listId")?.toString()}`);
    }
  }
};

export const saveToList = async (payload: List) => {
  try {
    const session = await auth();

    if (!session) return;

    await prisma.list.update({
      where: {
        id: payload.id,
        userId: session.user.id,
      },
      data: payload,
    });
  } catch (error) {
    console.error(error);
    return;
  }
};
