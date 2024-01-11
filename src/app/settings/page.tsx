"use client";

import { useSession } from "next-auth/react";

export default function Settings() {
  const session = useSession();

  if (!session) return <>Please sign in</>;

  return <div>Settings page</div>;
}
