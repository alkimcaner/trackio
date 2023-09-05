"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { BiCart, BiHeart } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const name = useMemo(() => session?.user?.name?.split(" ")[0], [session]);
  const userName = useMemo(
    () => session?.user?.email?.split("@")[0],
    [session]
  );

  return (
    <nav className="sticky top-0 z-20 w-full border-b bg-zinc-50">
      <div className="mx-auto flex max-w-7xl items-center gap-2 p-4">
        <Link href="/">Trackio</Link>
        <Input
          type="text"
          placeholder="Search"
          className="mx-auto w-full max-w-xs"
        />
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                <Image
                  src={session.user?.image || ""}
                  alt="Profile image"
                  width={24}
                  height={24}
                  className="mr-1 rounded-full"
                />
                <span className="text-sm">{name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <Link href={`/profile/${userName}`}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <a>Settings</a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn("google")}>Sign In</Button>
        )}
        <Link
          href="/favorites"
          className={buttonVariants({ variant: "ghost" })}
        >
          <BiHeart className="mr-1" /> Favorites
        </Link>
      </div>
    </nav>
  );
}
