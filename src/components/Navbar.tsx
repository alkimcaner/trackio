"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import SearchBar from "./SearchBar";
import {
  GearIcon,
  PersonIcon,
  ExitIcon,
  HeartIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import { ThemeToggle } from "./ThemeToggle";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/queryFunctions";

export default function Navbar() {
  const { data: session } = useSession();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const name = useMemo(() => session?.user?.name?.split(" ")[0], [session]);
  return (
    <nav className="sticky top-0 z-20 w-full border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-8 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="h-4 w-4"
          />
          <span className="mr-4 hidden sm:inline">Trackio</span>
        </Link>

        <SearchBar />

        {session ? (
          <>
            <Link
              href="/lists"
              className={buttonVariants({ variant: "ghost" })}
            >
              <ListBulletIcon className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Lists</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({ variant: "ghost" })}
              >
                <Image
                  src={session.user?.image || ""}
                  alt="Profile image"
                  width={24}
                  height={24}
                  className="rounded-full sm:mr-2"
                />
                <span className="hidden text-sm sm:inline">{name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={`/user/${user?.username}`}>
                  <DropdownMenuItem>
                    <PersonIcon className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </Link>

                <Link href="/favorites">
                  <DropdownMenuItem>
                    <HeartIcon className="mr-2 h-4 w-4" />
                    Favorites
                  </DropdownMenuItem>
                </Link>

                <Link href="/settings">
                  <DropdownMenuItem>
                    <GearIcon className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem onClick={() => signOut()}>
                  <ExitIcon className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button onClick={() => signIn("google")}>Sign In With Google</Button>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
