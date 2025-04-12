import { getNewGames } from "@/lib/rsc-queries";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import GameCard from "@/components/GameCard";

export default async function NewGamesPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const games = (await getNewGames(currentPage)) ?? [];
  const totalPages = 500;

  return (
    <main className="mx-auto max-w-7xl p-4">
      <h1 className="mb-4 text-xl">New Games</h1>
      <ResponsiveGrid>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ResponsiveGrid>

      <Pagination className="mt-8">
        <PaginationContent>
          {/* Previous button */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${currentPage - 1}`} />
            </PaginationItem>
          )}

          {/* First page */}
          <PaginationItem>
            <PaginationLink href="?page=1" isActive={currentPage === 1}>
              1
            </PaginationLink>
          </PaginationItem>

          {/* Ellipsis before current window */}
          {currentPage > 3 && totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Dynamic middle pages */}
          {Array.from({ length: 3 }, (_, i) => {
            const pageNum =
              currentPage === 1
                ? 2 + i
                : currentPage === totalPages
                  ? totalPages - 3 + i + 1
                  : currentPage - 1 + i;

            if (pageNum <= 1 || pageNum >= totalPages) return null;

            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`?page=${pageNum}`}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Ellipsis after current window */}
          {currentPage < totalPages - 2 && totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last page */}
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                href={`?page=${totalPages}`}
                isActive={currentPage === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Next button */}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={`?page=${currentPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </main>
  );
}
