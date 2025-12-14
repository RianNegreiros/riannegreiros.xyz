import { cva } from "class-variance-authority";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const paginationMenuTriggerStyle = cva(
  "cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

export default function PaginationNav({ maxPage }: { maxPage: number }) {
  const location = useLocation();
  const navigate = useNavigate();

  const pageNum = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get("page") ?? "0", 10);
  }, [location.search]);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    navigate(`${location.pathname}?${params}`, { replace: true });
  };

  const nextPage = () => {
    if (pageNum + 1 >= maxPage) return;
    goToPage(pageNum + 1);
  };

  const previousPage = () => {
    if (pageNum <= 0) return;
    goToPage(pageNum - 1);
  };

  return (
    <Pagination className="flex justify-center my-4">
      <PaginationContent className="flex space-x-2">
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={pageNum === 0}
            onClick={previousPage}
            className={`px-3 py-1 border rounded ${pageNum === 0 ? "cursor-not-allowed opacity-50" : paginationMenuTriggerStyle()}`}
          />
        </PaginationItem>
        {[...Array(maxPage)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => goToPage(index)}
              aria-current={pageNum === index ? "page" : undefined}
              className={`px-3 py-1 border rounded ${pageNum === index ? "bg-blue-500 text-white" : paginationMenuTriggerStyle()}`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            aria-disabled={pageNum + 1 >= maxPage}
            onClick={nextPage}
            className={`px-3 py-1 border rounded ${pageNum + 1 >= maxPage ? "cursor-not-allowed opacity-50" : paginationMenuTriggerStyle()}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
