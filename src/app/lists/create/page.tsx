import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createList } from "@/lib/actions";

export default function CreateList() {
  return (
    <main>
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-8">
        <form action={createList} className="space-y-8">
          <Input
            name="name"
            type="text"
            placeholder="Name"
            className="max-w-xs"
          />
          <Input
            name="description"
            type="text"
            placeholder="Description"
            className="max-w-xs"
          />
          <Switch name="isPrivate" id="private" />
          <Label htmlFor="private">Private</Label>
          <div>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
