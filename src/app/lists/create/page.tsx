import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createList } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreateList() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <main>
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-8">
        <form action={createList} className="space-y-8">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input name="name" type="text" className="max-w-xs" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea name="description" className="max-w-xs" />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="private">Private</Label>
            <Switch name="isPrivate" id="private" />
          </div>
          <div>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
