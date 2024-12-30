import { beforeZero } from "@app/lib/functions/beforeZero";
import type { Nullable } from "@app/types/general";

export const getTime = (string: string | Date) => {
  const date = new Date(string);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (isNaN(hours) || isNaN(minutes)) {
    return "";
  }
  return `${beforeZero(hours)}:${beforeZero(minutes)}`;
};

export const getTimeToDate = (time: Nullable<string>) => {
  if (!time) {
    return "";
  }
  const timeArr = time.split(":");

  if (timeArr.length !== 2) {
    return "";
  }

  const [hours, minutes] = timeArr;

  if (!hours || !minutes) {
    return "";
  }

  const date = new Date();
  date.setHours(+hours);
  date.setMinutes(+minutes);

  return date.toString();
};
