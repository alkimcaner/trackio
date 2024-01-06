"use server";

import { List } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { auth } from "./auth";

export const createList = async (formData: FormData) => {
  let session;

  try {
    session = await auth();

    if (!session) return;

    const payload = {
      name: formData.get("name")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      isPrivate: !!formData.get("isPrivate")?.toString(),
    };

    await prisma.list.create({
      data: {
        name: payload.name,
        description: payload.description,
        isPrivate: payload.isPrivate,
        userId: session.user.id,
      },
    });

    revalidatePath(`/user/${session.user.id}/lists`);
  } catch (error) {
    console.error(error);
    return;
  } finally {
    if (!!session) {
      redirect(`/user/${session.user.id}/lists`);
    }
  }
};

export const updateList = async (payload: List) => {
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

    revalidatePath(`/lists/${payload.id}`);
  } catch (error) {
    console.error(error);
    return;
  }
};

export const deleteList = async (listId: string) => {
  let session;

  try {
    session = await auth();

    if (!session) return;

    await prisma.list.delete({
      where: {
        id: listId,
        userId: session.user.id,
      },
    });

    revalidatePath(`/lists/${listId}`);
  } catch (error) {
    console.error(error);
    return;
  } finally {
    if (!!session) {
      redirect(`/user/${session.user.id}/lists`);
    }
  }
};
