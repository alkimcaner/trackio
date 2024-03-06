"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ExitIcon,
  GearIcon,
  ListBulletIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AuthNav() {
  const { data: session } = useSession();
  const nameArray = session?.user?.name?.split(" ");

  if (!session) {
    return <Button onClick={() => signIn("google")}>Sign In</Button>;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={session?.user?.image || ""}
              alt="Profile image"
              className="rounded-full"
            />
            <AvatarFallback>
              {nameArray?.map((name) => name[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm sm:inline">{nameArray?.at(0)}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
