"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

export default function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path === href
          ? buttonVariants({ variant: "secondary" })
          : buttonVariants({ variant: "outline" })
      }
    >
      {children}
    </Link>
  );
}
