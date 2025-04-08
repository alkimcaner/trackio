"use client";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ListBulletIcon } from "@radix-ui/react-icons";
import ListCheckbox from "./ListCheckbox";
import { signIn, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { UserWithLists } from "@/types/list";
import Image from "next/image";

export default function SaveToListDialog({
  iconOnly,
  item,
}: {
  iconOnly?: boolean;
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

  if (!session)
    return (
      <Dialog>
        <DialogTrigger asChild>
          {iconOnly ? (
            <Button variant="ghost" size="icon">
              <ListBulletIcon />
            </Button>
          ) : (
            <Button variant="ghost" className="h-fit flex-col gap-2">
              <ListBulletIcon className="h-4 w-4" />
              <span>Save To List</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Sign In</DialogTitle>
          <Button onClick={() => signIn("google")} className="gap-2">
            <Image src="/google.svg" height={16} width={16} alt="" /> Continue
            with Google
          </Button>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {iconOnly ? (
          <Button variant="ghost" size="icon">
            <ListBulletIcon />
          </Button>
        ) : (
          <Button variant="ghost" className="h-fit flex-col gap-2">
            <ListBulletIcon className="h-4 w-4" />
            <span>Save To List</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>
          <DialogTitle>Save To List</DialogTitle>
        </DialogTitle>
        <div className="mt-4 flex flex-col gap-6">
          {user?.lists.map((list) => (
            <ListCheckbox key={`checkbox-${list.id}`} item={item} list={list} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
