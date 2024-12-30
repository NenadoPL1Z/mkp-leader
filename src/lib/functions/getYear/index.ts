import { beforeZero } from "@app/lib/functions/beforeZero";

export const getYear = (string: string | Date) => {
  const date = new Date(string);
  const day = date.getDate();
  const month = date.getMonth();
  const fullYear = date.getFullYear();

  if (isNaN(day) || isNaN(month) || isNaN(fullYear)) {
    return "";
  }

  return `${beforeZero(day)}.${beforeZero(month + 1)}.${beforeZero(fullYear)}`;
};
