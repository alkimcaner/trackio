import { ReviewWithUser } from "@/types/review";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DotsHorizontalIcon,
  StarFilledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Review({ review }: { review: ReviewWithUser }) {
  const { data: session } = useSession();
  const isAuthorized = session?.user.id === review.userId;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/reviews`, {
        method: "DELETE",
        body: JSON.stringify({
          id: review.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to mutate");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", review.itemType, review.itemId],
      });
    },
  });

  return (
    <div key={review.id} className="flex gap-4">
      <Link href={`/user/${review.userId}`} className="group">
        <Avatar className="ring-primary transition group-hover:ring-2">
          <AvatarImage src={review.User.image || ""} alt="Profile image" />
        </Avatar>
      </Link>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-4">
          <Link
            href={`/user/${review.userId}`}
            className="text-sm hover:underline"
          >
            {review.User.name}
          </Link>

          {/* Score */}
          <div className="flex items-center gap-2">
            <StarFilledIcon />
            {review.score}
          </div>

          {isAuthorized && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6">
                  <DotsHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => mutation.mutate()}
                  className="gap-2"
                >
                  <TrashIcon /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <p className="break-all text-sm">{review.text}</p>
      </div>
    </div>
  );
}
