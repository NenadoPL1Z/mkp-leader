import { useRef } from "react";
import type {
  PaginationDisplayRefreshRef,
  PaginationExtends,
  PaginationFilterRef,
  PaginationResetRef,
  PaginationScrollRef,
  PaginationSetCardRef,
} from "@app/components/PaginationList/types";

export const usePaginationRefs = <T extends PaginationExtends>() => {
  const filterRef = useRef<PaginationFilterRef>(null);
  const scrollRef = useRef<PaginationScrollRef>(null);
  const setCardRef = useRef<PaginationSetCardRef<T>>(null);
  const resetRef = useRef<PaginationResetRef>(null);
  const displayRefreshRef = useRef<PaginationDisplayRefreshRef>(null);

  return {
    filterRef,
    scrollRef,
    setCardRef,
    resetRef,
    displayRefreshRef,
  };
};
