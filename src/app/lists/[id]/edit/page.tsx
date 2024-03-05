"use client";

import { ListWithUser } from "@/app/api/lists/[id]/route";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function EditList({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const { data: list, isLoading } = useQuery<ListWithUser>({
    queryKey: ["list", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/lists/${params.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/lists/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ id: params.id, name, description, isPrivate }),
      });

      if (!res.ok) {
        throw new Error("Failed to mutate");
      }

      return res.json();
    },
    onSuccess: () => {
      router.push(`/lists/${params.id}`);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    mutation.mutate();
  };

  useEffect(() => {
    if (!!list) {
      setName(list.name);
      setDescription(list.description);
      setIsPrivate(list.isPrivate);
    }
  }, [isLoading]);

  const isAuthorized = list?.userId === session?.user.id;
  if (!isAuthorized) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        List not found
      </div>
    );
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            required
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="private">Private</Label>
          <Switch
            name="isPrivate"
            id="private"
            checked={isPrivate}
            onCheckedChange={(e) => setIsPrivate(e.valueOf())}
          />
        </div>
        <div className="flex gap-2">
          <Link
            href={`/lists/${params.id}`}
            className={buttonVariants({ variant: "secondary" })}
          >
            Cancel
          </Link>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </section>
  );
}
