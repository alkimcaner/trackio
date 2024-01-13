"use client";

import { useSession } from "next-auth/react";

export default function Settings() {
  const { data: session } = useSession();

  if (!session) return <div>Please sign in</div>;

  return <div>Settings page</div>;
}
