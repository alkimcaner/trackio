"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { List, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const createList = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);

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
    // redirect("/");
  } catch (error) {
    console.error(error);
    return;
  }
};

export const updateList = async (listId: string, payload: List) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return;

    await prisma.list.update({
      where: {
        id: listId,
        userId: session.user.id,
      },
      data: payload,
    });
  } catch (error) {
    console.error(error);
    return;
  }
};

export const deleteList = async (listId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return;

    await prisma.list.delete({
      where: {
        id: listId,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.error(error);
    return;
  }
};
