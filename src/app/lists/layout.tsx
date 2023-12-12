"use client";

import CreateListDialog from "@/components/CreateListDialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { getUser } from "@/lib/queryFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  TrashIcon,
  Pencil2Icon,
  BarChartIcon,
  DotsVerticalIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const deleteList = (payload: { id: string }) =>
  fetch("/api/games/lists/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());

export default function ListsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [parent, enableAnimations] = useAutoAnimate();
  const params = useParams();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const mutation = useMutation({
    mutationFn: deleteList,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <div className="flex">
      {user && (
        <aside ref={parent} className="space-y-2 p-2">
          <div className="px-4 py-1 text-xs text-muted-foreground">
            Public Lists
          </div>

          <Button
            asChild
            variant={params?.id === "popular" ? "secondary" : "ghost"}
            className="justify-start"
          >
            <Link href="/lists/popular" className="w-full gap-2">
              <BarChartIcon />
              Popular
            </Link>
          </Button>

          <Button
            asChild
            variant={params?.id === "recent" ? "secondary" : "ghost"}
            className="justify-start"
          >
            <Link href="/lists/recent" className="w-full gap-2">
              <ClockIcon />
              Recent
            </Link>
          </Button>

          <Separator />

          <div className="px-4 py-1 text-xs text-muted-foreground">
            My Lists
          </div>

          <CreateListDialog />

          {user?.gameLists?.map((list: any) => (
            <div key={list?.id} className="flex gap-2">
              <Button
                asChild
                variant={params?.id === list?.id ? "secondary" : "ghost"}
                className="justify-start"
              >
                <Link href={`/lists/${list?.id}`} className="w-52 gap-2">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {list?.name}
                  </div>
                  {list?.isPublic && (
                    <Badge variant={"secondary"}>Public</Badge>
                  )}
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={buttonVariants({ size: "icon", variant: "ghost" })}
                >
                  <DotsVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Pencil2Icon className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => mutation.mutate({ id: list.id })}
                  >
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </aside>
      )}

      {children}
    </div>
  );
}
