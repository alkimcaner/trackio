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
import Image from "next/image";
import {
  ExitIcon,
  GearIcon,
  ListBulletIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Skeleton } from "./ui/skeleton";

export default function AuthNav() {
  const { data: session, status } = useSession();
  const name = session?.user?.name?.split(" ")[0];

  if (status === "loading") {
    return <Skeleton className="h-10 w-20" />;
  }

  if (status === "unauthenticated") {
    return <Button onClick={() => signIn("google")}>Sign In</Button>;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
          <Image
            priority
            src={session?.user?.image || ""}
            alt="Profile image"
            width={24}
            height={24}
            className="rounded-full sm:mr-2"
          />
          <span className="hidden text-sm sm:inline">{name}</span>
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
