"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateList, getList } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function EditList({ params }: { params: { id: string } }) {
  const { data: list } = useQuery({
    queryKey: ["lists", params.id],
    queryFn: () => getList(params.id),
  });

  const { data: session } = useSession();
  const isAuthorized = list?.userId === session?.user.id;

  if (!isAuthorized) return <>List not found</>;

  return (
    <main>
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-8">
        <form action={updateList} className="space-y-8">
          <Input name="listId" type="hidden" value={params.id} />
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              required
              name="name"
              type="text"
              placeholder="Name"
              defaultValue={list?.name}
              className="max-w-xs"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              required
              name="description"
              defaultValue={list?.description}
              className="max-w-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="private">Private</Label>
            <Switch
              name="isPrivate"
              id="private"
              defaultChecked={list?.isPrivate}
            />
          </div>
          <div>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
