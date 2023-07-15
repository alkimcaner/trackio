"use client";

import { userAtom } from "@/lib/store";
import { useAtom } from "jotai";

export default function Profile() {
  const [user, setUser] = useAtom(userAtom);

  return <div>Profile: {user?.displayName}</div>;
}
