import type { Sort } from "./types";

export const sortData: Sort[] = [
  { title: "Сначала новые", value: "date_desc" },
  { title: "Сначала старые", value: "date_asc" },
];

export const sortDataInitial = sortData[0];
