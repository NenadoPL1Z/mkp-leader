import type { Nullable } from "@app/types/general";

export const getWorkTime = (
  opening_time: Nullable<string>,
  closing_time: Nullable<string>,
) => {
  return `${opening_time ? `С ${opening_time}` : ""}${
    closing_time ? ` До ${closing_time}` : ""
  }`;
};
