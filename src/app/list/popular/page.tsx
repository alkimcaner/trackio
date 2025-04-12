import { PrismaClient } from "@prisma/client";
import ListCard from "@/components/ListCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { ListWithUser } from "@/types/list";

const prisma = new PrismaClient();

export default async function PopularListsPage() {
  const publicLists = (await prisma.list.findMany({
    where: {
      isPrivate: false,
    },
    include: { User: true },
    orderBy: {
      createdAt: "desc",
    },
  })) as ListWithUser[];

  return (
    <main className="mx-auto max-w-7xl p-4 w-full">
      <h1 className="mb-4 text-xl">Popular Lists</h1>
      <ResponsiveGrid>
        {publicLists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </ResponsiveGrid>
    </main>
  );
}
