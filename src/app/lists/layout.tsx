"use client";

import CreateListDialog from "@/components/CreateListDialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { getUser } from "@/lib/queryFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  TrashIcon,
  Pencil2Icon,
  GlobeIcon,
  DotsVerticalIcon,
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
        <aside ref={parent} className="flex flex-col gap-2 p-2">
          <CreateListDialog />

          <Button
            asChild
            variant={params?.id === undefined ? "secondary" : "ghost"}
            className="justify-start"
          >
            <Link href="/lists" className="gap-1">
              <GlobeIcon />
              Public Lists
            </Link>
          </Button>

          {user?.gameLists?.map((list: any) => (
            <div key={list?.id} className="flex w-full gap-1">
              <Button
                asChild
                variant={params?.id === list?.id ? "secondary" : "ghost"}
                className="justify-start"
              >
                <Link href={`/lists/${list?.id}`} className="w-48 gap-2">
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
