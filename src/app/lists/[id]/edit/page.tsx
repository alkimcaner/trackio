import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateList } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { getList } from "@/lib/queries";
import { redirect } from "next/navigation";

export default async function EditList({ params }: { params: { id: string } }) {
  const session = await auth();
  const list = await getList(params.id);
  const isAuthorized = list?.userId === session?.user.id;

  if (!isAuthorized) redirect(`/lists/${params.id}`);

  return (
    <main>
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-8">
        <form action={updateList} className="space-y-8">
          {/* Create a hidden input to send the list id to server action */}
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
