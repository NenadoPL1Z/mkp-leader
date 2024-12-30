import { useEffect, useRef, useState } from "react";
import type {
  PaginationResetRef,
  PaginationConfigQuery,
} from "@app/components/PaginationList/types";

export const useSearch = () => {
  const resetRef = useRef<PaginationResetRef>(null);

  const [search, setSearch] = useState<string>("");
  const prevSearchValue = useRef<string>("");

  const query: PaginationConfigQuery = [`search=${search}`];

  const handleChangeSearch = (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    const isNewValue = prevSearchValue.current !== search;

    if (resetRef.current && isNewValue) {
      resetRef.current({ resetQuery: [`search=${search}`] });
    }

    prevSearchValue.current = search;
  }, [search]);

  return {
    resetRef,
    query,
    handleChangeSearch,
  };
};
