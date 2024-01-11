"use client";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { saveToList, ListWithUser } from "@/lib/actions";
import { useMutation } from "@tanstack/react-query";

export default function ListCheckbox({
  gameId,
  list,
}: {
  gameId: string;
  list: ListWithUser;
}) {
  const isChecked = list.items.includes(gameId);

  const saveToListMutation = useMutation({ mutationFn: saveToList });

  const handleSave = () => {
    let newList = list;

    if (newList.items.includes(gameId)) {
      newList.items = newList.items.filter((id) => id !== gameId);
    } else {
      newList.items.push(gameId);
    }

    saveToListMutation.mutate({
      description: newList.description,
      id: newList.id,
      isPrivate: newList.isPrivate,
      items: newList.items,
      name: newList.name,
      userId: newList.userId,
    });
  };

  return (
    <div key={list.id} className="flex items-center gap-4">
      <Checkbox
        id={`checkbox-${list.id}`}
        checked={isChecked}
        onClick={handleSave}
      />
      <Label htmlFor={`checkbox-${list.id}`}>{list.name}</Label>
      {list?.isPrivate && <Badge variant={"secondary"}>Private</Badge>}
    </div>
  );
}
