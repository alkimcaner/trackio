import { GameList } from "@prisma/client";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const updateList = (list: GameList) =>
  fetch(`/api/lists/${list.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  }).then((res) => res.json());

export default function ListCheckbox({
  gameId,
  list,
}: {
  gameId: string;
  list: GameList;
}) {
  const [isChecked, setIsChecked] = useState(() =>
    list.gameIds.includes(gameId)
  );

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateList,
    onSettled: () => {
      setIsChecked((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
  });

  const handleCheckedChange = () => {
    let newList = list;

    if (newList.gameIds.includes(gameId)) {
      newList.gameIds = newList.gameIds.filter((id) => id !== gameId);
    } else {
      newList.gameIds.push(gameId);
    }

    updateMutation.mutate(newList);
  };

  return (
    <div key={list.id} className="flex items-center gap-4">
      <Checkbox
        id={`checkbox-${list.id}`}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
      />
      <Label htmlFor={list.id}>{list.name}</Label>
      {list?.isPublic && <Badge variant={"secondary"}>Public</Badge>}
    </div>
  );
}
