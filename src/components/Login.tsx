"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/store";

export default function Login() {
  const [user, setUser] = useAtom(userAtom);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user ? (
    <button onClick={handleLogout} className="bg-white p-1 text-black">
      Logout
    </button>
  ) : (
    <button onClick={handleLogin} className="bg-white p-1 text-black">
      Login
    </button>
  );
}
