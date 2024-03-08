"use client";

import NavLink from "@/components/NavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/user/${params.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
  });

  const nameInitials = useMemo(
    () =>
      user?.name
        ?.split(" ")
        .map((name) => name[0])
        .join(""),
    [user?.name]
  );

  return (
    <div>
      <header className="space-y-8 py-4">
        <div className="flex items-center gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-8 w-64 rounded-full" />
            </>
          ) : (
            <>
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user?.image || ""}
                  alt="Profile image"
                  className="rounded-full"
                />
                <AvatarFallback>{nameInitials}</AvatarFallback>
              </Avatar>
              <div className="text-2xl">{user?.name}</div>
            </>
          )}
        </div>

        <nav className="flex gap-2">
          <NavLink href={`/user/${params.id}/lists`}>Lists</NavLink>
          <NavLink href={`/user/${params.id}/reviews`}>Reviews</NavLink>
        </nav>
      </header>

      <Separator />

      {children}
    </div>
  );
}
