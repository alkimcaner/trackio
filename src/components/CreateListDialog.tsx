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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil2Icon } from "@radix-ui/react-icons";

const createList = (payload: { name: string; isPublic: boolean }) =>
  fetch("/api/games/lists/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());

export default function CreateListDialog() {
  const [name, setName] = useState("My List");
  const [isPublic, setIsPublic] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createList,
    onMutate: () => {
      setName("My List");
      setIsPublic(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-64 justify-between">
          New List <Pencil2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New List</DialogTitle>
          <DialogDescription>
            Make changes to your list here. Click create when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="public" className="text-right">
              Public
            </Label>
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={(e) => setIsPublic(e.valueOf())}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => mutation.mutate({ name, isPublic })}
              type="submit"
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
