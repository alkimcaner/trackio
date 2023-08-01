"use client";

import { Provider } from "jotai";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
