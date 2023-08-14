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
import { BiUser, BiLibrary, BiLogOut, BiCart, BiHeart } from "react-icons/bi";
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
    <nav className="sticky top-0 z-20 w-full bg-zinc-50">
      <div className="mx-auto flex max-w-7xl items-center gap-2 p-4">
        <Link href="/">GamingStore</Link>
        <Input
          type="text"
          placeholder="Search Store"
          className="mx-auto w-full max-w-xs"
        />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                <Image
                  src={user.photoURL || ""}
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
              <Link href="/library">
                <DropdownMenuItem>Library</DropdownMenuItem>
              </Link>
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
        <Link href="/wishlist" className={buttonVariants({ variant: "ghost" })}>
          <BiHeart className="mr-1" /> Wishlist
        </Link>
        <Link href="/cart" className={buttonVariants({ variant: "ghost" })}>
          <BiCart className="mr-1" /> Cart
        </Link>
      </div>
    </nav>
  );
}
