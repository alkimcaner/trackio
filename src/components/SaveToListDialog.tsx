"use client";

import { useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ListBulletIcon } from "@radix-ui/react-icons";
import { getUser } from "@/lib/queryFunctions";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

const updateList = (payload: { listId: string }) =>
  fetch("/api/games/lists/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());

export default function GameListDialog({ icon }: { icon?: boolean }) {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const mutation = useMutation({
    mutationFn: updateList,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

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
          {user?.gameLists.map((list) => (
            <div key={list.id} className="flex items-center gap-4">
              <Checkbox id={list.id} />
              <Label htmlFor={list.id}>{list.name}</Label>
              {list?.isPublic && <Badge variant={"secondary"}>Public</Badge>}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
