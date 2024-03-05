"use client";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ListWithUser } from "@/app/api/lists/[id]/route";

export default function ListCheckbox({
  gameId,
  list,
}: {
  gameId: string;
  list: ListWithUser;
}) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      fetch(`/api/lists/${list.id}/save`, {
        method: "POST",
        body: JSON.stringify({ gameId: gameId }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userLists", session?.user.id],
      });
    },
  });

  const isListsLoading = queryClient.isFetching({
    queryKey: ["userLists", session?.user.id],
  });

  return (
    <div key={list.id} className="flex items-center gap-4">
      <Checkbox
        id={`checkbox-${list.id}`}
        checked={list.items.includes(gameId)}
        disabled={mutation.isPending || !!isListsLoading}
        onClick={() => mutation.mutate()}
        className="disabled:cursor-wait"
      />
      <Label
        htmlFor={`checkbox-${list.id}`}
        className="peer-disabled:cursor-wait"
      >
        {list.name}
      </Label>
      {list?.isPrivate && <Badge variant={"secondary"}>Private</Badge>}
    </div>
  );
}
