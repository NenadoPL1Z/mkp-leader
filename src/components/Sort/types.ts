import type { ButtonUIProps } from "@app/ui/ButtonUI/types";

export type Sort = { title: string; value: string };

export type Filter = { isEmergency: boolean; isCustomPosition: boolean };
export type SortChange<T = void> = (sort: Sort) => T;
export type FilterChange = (data: Partial<Filter>) => void;

export type SortProps = {
  sort: {
    value: Sort;
    onChange: SortChange<void>;
  };
  filters: {
    value: Filter;
    onChange: FilterChange;
  };
};

export type SortBottomSheetProps = {
  sort: Sort;
  isOpen: boolean;
  handleClose: () => void;
  handleChangeSort: SortChange<() => void>;
};

export type SortButtonProps = Omit<ButtonUIProps, "children"> & {
  title: string;
};
