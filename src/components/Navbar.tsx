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
import { useEffect, Fragment } from "react";

export default function Navbar() {
  const [user, setUser] = useAtom(userAtom);

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
    <nav className="sticky top-0 z-20 flex h-16 w-full items-center justify-between bg-base-300 px-4 py-2">
      <div>GamingStore</div>
      <input
        type="text"
        placeholder="Search Store"
        className="input input-md w-full max-w-xs rounded-full"
      />
      {user ? (
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn btn-ghost">
            {user.displayName}
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Library</a>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
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
