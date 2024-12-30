import { useToggle } from "@app/hooks/useToggle";
import { useEffect } from "react";
import type { SortChange, SortProps } from "./types";

export const useSort = ({ sort, filters }: SortProps) => {
  const sortBS = useToggle();
  const filtersBS = useToggle();
  const emergency = useToggle(filters.value.isEmergency);
  const customPosition = useToggle(filters.value.isCustomPosition);

  const handleChangeSort: SortChange<() => void> = (value) => () => {
    sortBS.handleToggleFalse();
    sort.onChange(value);
  };

  const handleCloseFilters = () => {
    filtersBS.handleToggleFalse();
    filters.onChange({
      isEmergency: emergency.isToggle,
      isCustomPosition: customPosition.isToggle,
    });
  };

  useEffect(() => {
    emergency.handleToggleState(filters.value.isEmergency);
    customPosition.handleToggleState(filters.value.isCustomPosition);
  }, [filters.value.isEmergency, filters.value.isCustomPosition]);

  return {
    sortBS,
    filtersBS,
    emergency,
    customPosition,
    handleChangeSort,
    handleCloseFilters,
  };
};
