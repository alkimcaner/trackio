import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ListBulletIcon } from "@radix-ui/react-icons";
import ListCheckbox from "./ListCheckbox";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function SaveToListDialog({
  gameId,
  icon,
}: {
  gameId: string;
  icon?: boolean;
}) {
  const session = await getServerSession(authOptions);

  if (!session) return <></>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {icon ? (
          <Button variant="ghost" size="icon">
            <ListBulletIcon />
          </Button>
        ) : (
          <Button variant={"outline"}>
            <ListBulletIcon className="mr-2 h-4 w-4" />
            Save To List
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save To List</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-6">
          {/* {lists?.map((list) => (
            <ListCheckbox
              key={`checkbox-${list.id}`}
              gameId={gameId}
              list={list}
            />
          ))} */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
