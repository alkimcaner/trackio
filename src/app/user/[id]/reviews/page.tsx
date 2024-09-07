"use client";

import ResponsiveGrid from "@/components/ResponsiveGrid";
import Review from "@/components/Review";
import { UserWithLists } from "@/types/list";
import { ReviewWithUser } from "@/types/review";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function UserReviews({ params }: { params: { id: string } }) {
  const { data: user } = useQuery<
    UserWithLists & { reviews: ReviewWithUser[] }
  >({
    queryKey: ["user", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/user/${params.id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      return res.json();
    },
  });

  return (
    <section className="grid gap-16 lg:grid-cols-2">
      {user?.reviews?.map((review) => (
        <Link
          href={`/${review.itemType}/${review.itemId}`}
          key={review.id}
          className="w-fit rounded p-4 transition hover:bg-white/5"
        >
          <Review review={review} />
        </Link>
      ))}
    </section>
  );
}
