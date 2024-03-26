import { ReviewWithUser } from "@/types/review";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { StarFilledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        <Avatar className="ring-primary transition group-hover:ring-2 lg:h-16 lg:w-16">
          <AvatarImage src={review.User.image || ""} alt="Profile image" />
        </Avatar>
      </Link>

      <div className="flex-1 space-y-4 rounded-lg bg-muted p-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/user/${review.userId}`}
            className="text-sm hover:underline"
          >
            {review.User.name}
          </Link>

          {/* Score */}
          <div className="flex items-center gap-1">
            <StarFilledIcon />
            {review.score}
          </div>

          {isAuthorized && (
            <Button
              onClick={() => mutation.mutate()}
              variant="destructive"
              size="icon"
              className="ml-auto h-8 w-8"
            >
              <TrashIcon />
            </Button>
          )}
        </div>

        <p className="break-all text-sm">{review.text}</p>
      </div>
    </div>
  );
}
