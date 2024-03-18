"use client";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ListType, ListWithUser } from "@/types/list";

export default function ListCheckbox({
  item,
  list,
}: {
  item: { id: string; type: string };
  list: ListWithUser;
}) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      fetch(`/api/lists/${list.id}/save`, {
        method: "POST",
        body: JSON.stringify(item),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", session?.user.id],
      });
    },
  });

  const isListsLoading = queryClient.isFetching({
    queryKey: ["user", session?.user.id],
  });

  let isChecked = false;

  if (item.type === ListType.Game) {
    isChecked = list.gameIds.includes(item.id);
  } else if (item.type === ListType.Movie) {
    isChecked = list.movieIds.includes(item.id);
  } else if (item.type === ListType.TV) {
    isChecked = list.tvIds.includes(item.id);
  }

  return (
    <div key={list.id} className="flex items-center gap-4">
      <Checkbox
        id={`checkbox-${list.id}`}
        checked={isChecked}
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
