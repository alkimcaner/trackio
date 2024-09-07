"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ListWithUser } from "@/types/list";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function EditList({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);

  const { data: list, isLoading } = useQuery<ListWithUser>({
    queryKey: ["list", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/list/${params.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/list/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: params.id,
          name,
          description,
          tags,
          isPrivate,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to mutate");
      }

      return res.json();
    },
    onSuccess: () => {
      router.push(`/list/${params.id}`);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutation.mutate();
  };

  useEffect(() => {
    if (!!list) {
      setName(list.name);
      setDescription(list.description);
      setTags(list.tags);
      setIsPrivate(list.isPrivate);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const isAuthorized = list?.userId === session?.user.id;
  if (!isAuthorized) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        List not found
      </div>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-8">
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
        <div>
          <Label htmlFor="tags">Tags</Label>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              name="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="max-w-xs"
            />
            <Button
              type="button"
              onClick={() => {
                setTags((prev) => Array.from(new Set([...prev, tagInput])));
                setTagInput("");
              }}
            >
              Add
            </Button>
          </div>
          <div className="mt-4 flex gap-2">
            {tags.map((tag) => (
              <Badge
                key={`key-${tag}`}
                variant={"outline"}
                className="cursor-pointer ring-red-500 hover:ring-1"
                onClick={() => setTags((prev) => prev.filter((e) => e !== tag))}
              >
                {tag}
              </Badge>
            ))}
          </div>
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
            href={`/list/${params.id}`}
            className={buttonVariants({ variant: "secondary" })}
          >
            Cancel
          </Link>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </main>
  );
}
