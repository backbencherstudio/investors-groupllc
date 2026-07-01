interface TablePaginationProps {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  totalPages?: number;
  currentPage?: number;
  totalResults?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean; // Show First/Last buttons
  siblingCount?: number; // Number of siblings to show on each side
}

export function TablePagination({
  pagination,
  totalPages: totalPagesProp,
  currentPage,
  totalResults,
  pageSize,
  onPageChange,
  showFirstLast = false,
  siblingCount = 1,
}: TablePaginationProps) {
  const page = pagination?.page ?? currentPage ?? 1;
  const limit = pagination?.limit ?? pageSize ?? 10;
  const total = pagination?.total ?? totalResults ?? 0;
  const totalPages = pagination?.totalPages ?? totalPagesProp ?? 0;

  // Advanced pagination logic with configurable siblings
  const getPageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 ellipsis
    const pages: (number | string)[] = [];

    if (totalPages <= totalPageNumbers) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(page - siblingCount, 1);
      const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

      const shouldShowLeftEllipsis = leftSiblingIndex > 2;
      const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

      // First page
      pages.push(1);

      // Left ellipsis
      if (shouldShowLeftEllipsis) {
        pages.push("...");
      }

      // Middle pages
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      // Right ellipsis
      if (shouldShowRightEllipsis) {
        pages.push("...");
      }

      // Last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const startIdx = total === 0 ? 0 : (page - 1) * limit + 1;
  const endIdx = Math.min(page * limit, total);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-zinc-500">
        {`Showing ${startIdx}–${endIdx} of ${total} results`}
      </div>

      <nav className="inline-flex rounded-lg border border-zinc-200 bg-white overflow-hidden">
        <ul className="flex divide-x divide-zinc-200">
          {showFirstLast && (
            <li>
              <button
                className="px-4 py-2 text-sm text-zinc-500 bg-white hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => onPageChange(1)}
                disabled={page === 1}
              >
                First
              </button>
            </li>
          )}

          <li>
            <button
              className="px-4 py-2 text-sm text-zinc-500 bg-white hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>

          {pages.map((p, index) => (
            <li key={index}>
              {p === "..." ? (
                <span className="px-4 py-2 text-sm text-zinc-500 bg-white select-none">
                  ...
                </span>
              ) : (
                <button
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-orange-500 text-white"
                      : "bg-white text-zinc-700 hover:bg-zinc-100"
                  }`}
                  onClick={() => onPageChange(p as number)}
                >
                  {p}
                </button>
              )}
            </li>
          ))}

          <li>
            <button
              className="px-4 py-2 text-sm text-zinc-500 bg-white hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </li>

          {showFirstLast && (
            <li>
              <button
                className="px-4 py-2 text-sm text-zinc-500 bg-white hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => onPageChange(totalPages)}
                disabled={page === totalPages}
              >
                Last
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
