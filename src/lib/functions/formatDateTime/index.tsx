import dayjs, { EU_DATE_FORMAT, USER_TIMEZONE_OFFSET } from "@app/lib/dayjs";

export const formatDateTime = (
  date: string,
  format = EU_DATE_FORMAT,
): string => {
  if (!date) return "";
  return dayjs.utc(date).add(USER_TIMEZONE_OFFSET, "hour").format(format);
};
