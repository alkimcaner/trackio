"use client";

import { ReviewWithUser } from "@/types/review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FormEvent, useState } from "react";
import Review from "./Review";
import { signIn, useSession } from "next-auth/react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";

export default function Reviews({
  itemType,
  itemId,
}: {
  itemType: string;
  itemId: string;
}) {
  const [reviewInput, setReviewInput] = useState("");
  const [reviewScore, setReviewScore] = useState(5);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: reviews } = useQuery<ReviewWithUser[]>({
    queryKey: ["reviews", itemType, itemId],
    queryFn: async () => {
      const res = await fetch(
        `/api/reviews?itemType=${itemType}&itemId=${itemId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
    enabled: !!itemId,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify({
          itemType: itemType,
          itemId: itemId,
          text: reviewInput,
          score: reviewScore,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to mutate");
      }

      return res.json();
    },
    onSuccess: () => {
      setReviewInput("");
      setReviewScore(5);
      queryClient.invalidateQueries({
        queryKey: ["reviews", itemType, itemId],
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutation.mutate();
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Reviews</h2>

      {session ? (
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <StarFilledIcon
                key={`star-${index + 1}`}
                className={`h-6 w-6 cursor-pointer ${
                  index + 1 > reviewScore ? "text-muted" : "text-foreground"
                } ${!session && "cursor-not-allowed text-muted"}`}
                onClick={() => session && setReviewScore(index + 1)}
              />
            ))}
          </div>
          <Textarea
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
            disabled={!session}
            required
          />
          <Button type="submit" disabled={!session}>
            Submit
          </Button>
        </form>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="my-4">Please sign in to review</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>Sign In</DialogHeader>
            <Button onClick={() => signIn("google")} className="gap-2">
              <Image src="/google.svg" height={16} width={16} alt="" /> Continue
              with Google
            </Button>
          </DialogContent>
        </Dialog>
      )}

      <div className="space-y-16 py-4">
        {reviews?.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
