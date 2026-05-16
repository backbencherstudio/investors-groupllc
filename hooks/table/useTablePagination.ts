// hooks/useTablePagination.ts
import { useState } from "react";

interface UseTablePaginationProps {
  initialPage?: number;
  initialItemsPerPage?: number;
}

export function useTablePagination({
  initialPage = 1,
  initialItemsPerPage = 5,
}: UseTablePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const reset = () => setCurrentPage(1);

  return {
    currentPage,
    setCurrentPage,
    reset,
    itemsPerPage,
    setItemsPerPage,
  };
}