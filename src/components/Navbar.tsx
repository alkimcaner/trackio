"use client";

import { auth } from "@/lib/firebase";
import { userAtom } from "@/lib/store";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { BiUser, BiLibrary, BiLogOut, BiCart } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";

export default function Navbar() {
  const [user, setUser] = useAtom(userAtom);
  const name = useMemo(() => user?.displayName?.split(" ")[0], [user]);
  const userName = useMemo(() => user?.email?.split("@")[0], [user]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  const handleSignOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="sticky top-0 z-20 flex h-16 w-full items-center gap-4 bg-zinc-50 px-4 py-2">
      <Link href="/">GamingStore</Link>
      <Input
        type="text"
        placeholder="Search Store"
        className="mx-auto w-full max-w-[12rem]"
      />
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <Image
                src={user.photoURL || ""}
                alt="Profile image"
                width={32}
                height={32}
                className="rounded-full"
              />
              {name}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/profile/${userName}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/library">Library</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a>Settings</a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={handleSignIn} className="">
          Sign In
        </Button>
      )}
      <Link href="/cart" className={buttonVariants({ variant: "outline" })}>
        <BiCart className="mr-1" /> Cart
      </Link>
    </nav>
  );
}
