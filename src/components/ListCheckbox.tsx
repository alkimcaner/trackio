import { List } from "@prisma/client";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const updateList = (list: List) =>
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
  list: List;
}) {
  const [isChecked, setIsChecked] = useState(() => list.items.includes(gameId));

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateList,
    onSettled: () => {
      setIsChecked((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["list", list.id] });
    },
  });

  const handleCheckedChange = () => {
    let newList = list;

    if (newList.items.includes(gameId)) {
      newList.items = newList.items.filter((id) => id !== gameId);
    } else {
      newList.items.push(gameId);
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
      <Label htmlFor={`checkbox-${list.id}`}>{list.name}</Label>
      {list?.isPrivate && <Badge variant={"secondary"}>Private</Badge>}
    </div>
  );
}
