"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ListBulletIcon } from "@radix-ui/react-icons";
import ListCheckbox from "./ListCheckbox";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { UserWithLists } from "@/types/list";

export default function SaveToListDialog({
  icon,
  item,
}: {
  icon?: boolean;
  item: { id: string; type: string };
}) {
  const { data: session } = useSession();

  const { data: user } = useQuery<UserWithLists>({
    queryKey: ["user", session?.user.id],
    queryFn: async () => {
      const res = await fetch(`/api/user/${session?.user.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
    enabled: !!session,
  });

  if (!session) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {icon ? (
          <Button variant="ghost" size="icon">
            <ListBulletIcon />
          </Button>
        ) : (
          <Button className="w-fit">
            <ListBulletIcon className="mr-2 h-4 w-4" />
            <span>Save To List</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save To List</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-6">
          {user?.lists.map((list) => (
            <ListCheckbox key={`checkbox-${list.id}`} item={item} list={list} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
