"use client";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { saveToList, ListWithUser } from "@/lib/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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
    mutationFn: saveToList,
    onSuccess: () => {
      queryClient.invalidateQueries(["userLists", session?.user.id]);
    },
  });
  const isListsLoading = queryClient.isFetching([
    "userLists",
    session?.user.id,
  ]);

  return (
    <div key={list.id} className="flex items-center gap-4">
      <Checkbox
        id={`checkbox-${list.id}`}
        checked={list.items.includes(gameId)}
        disabled={mutation.isLoading || !!isListsLoading}
        onClick={() => mutation.mutate({ listId: list.id, gameId })}
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
