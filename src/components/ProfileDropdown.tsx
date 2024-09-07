"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ExitIcon,
  GearIcon,
  ListBulletIcon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";

export default function ProfileDropdown() {
  const { data: session } = useSession();

  const nameArray = useMemo(
    () => session?.user?.name?.split(" "),
    [session?.user.name]
  );

  const nameInitials = useMemo(
    () =>
      session?.user?.name
        ?.split(" ")
        .map((name) => name[0])
        .join(""),
    [session?.user.name]
  );

  if (!session) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Sign In</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>Sign In</DialogHeader>
          <Button onClick={() => signIn("google")} className="gap-2">
            <Image src="/google.svg" height={16} width={16} alt="" /> Continue
            with Google
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={session?.user?.image || ""}
              alt="Profile image"
              className="rounded-full"
            />
            <AvatarFallback className="text-xs">{nameInitials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm sm:inline">{nameArray?.at(0)}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/list/create`}>
              <PlusIcon className="mr-2 h-4 w-4" />
              New list
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`/user/${session?.user.id}`}>
              <PersonIcon className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/user/${session?.user.id}/lists`}>
              <ListBulletIcon className="mr-2 h-4 w-4" />
              Lists
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings">
              <GearIcon className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => signOut()}>
            <ExitIcon className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
