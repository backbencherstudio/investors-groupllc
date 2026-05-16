// hooks/useTableFilters.ts
import { useState } from "react";

export function useTableFilters<T extends Record<string, any>>() {
  const [filters, setFilters] = useState<T>({} as T);

  const setFilter = (key: keyof T, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setFilters({} as T);

  const isEmpty = !Object.values(filters).some(Boolean);

  return { filters, setFilter, reset, isEmpty };
}