"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateList() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/list`, {
        method: "POST",
        body: JSON.stringify({ name, description, tags, isPrivate }),
      });

      if (!res.ok) {
        throw new Error("Failed to mutate");
      }

      return res.json();
    },
    onSuccess: () => {
      router.push(`/user/${session?.user.id}/lists`);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    mutation.mutate();
  };

  if (!session) {
    return <div>Please sign in</div>;
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            required
            name="name"
            type="text"
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
        <div>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </main>
  );
}
