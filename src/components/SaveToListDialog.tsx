"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { ListBulletIcon } from "@radix-ui/react-icons";
import { getMyLists } from "@/lib/queryFunctions";
import ListCheckbox from "./ListCheckbox";
import { useSession } from "next-auth/react";

export default function SaveToListDialog({
  gameId,
  icon,
}: {
  gameId: string;
  icon?: boolean;
}) {
  const { data: session } = useSession();

  const { data: lists } = useQuery({
    queryKey: ["lists"],
    queryFn: getMyLists,
  });

  if (!session) return <></>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {icon ? (
          <Button variant="ghost" size="icon">
            <ListBulletIcon />
          </Button>
        ) : (
          <Button variant={"outline"}>
            <ListBulletIcon className="mr-2 h-4 w-4" />
            Save To List
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save To List</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-6">
          {lists?.map((list) => (
            <ListCheckbox
              key={`checkbox-${list.id}`}
              gameId={gameId}
              list={list}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
