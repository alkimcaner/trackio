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
    <nav className="sticky top-0 z-20 flex h-16 w-full items-center gap-4 bg-base-300 px-4 py-2">
      <Link href="/" className="mr-auto">
        GamingStore
      </Link>
      <input
        type="text"
        placeholder="Search Store"
        className="input input-sm w-full max-w-[12rem] rounded-full"
      />
      <Link href="/cart" className="btn btn-ghost">
        <BiCart />
      </Link>
      {user ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <Image
              src={user.photoURL || ""}
              alt="Profile image"
              width={32}
              height={32}
              className="rounded-full"
            />
            {name}
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] w-52 border border-base-content/25 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href={`/profile/${userName}`}>
                <BiUser /> Profile
              </Link>
            </li>
            <li>
              <Link href="/library">
                <BiLibrary />
                Library
              </Link>
            </li>
            <li>
              <a>
                <FiSettings />
                Settings
              </a>
            </li>
            <li>
              <button onClick={handleSignOut}>
                <BiLogOut />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button onClick={handleSignIn} className="btn btn-ghost">
          Sign In
        </button>
      )}
    </nav>
  );
}
