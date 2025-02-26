export const formatDateTime = (
  date: string,
  variant: "date" | "date_time" = "date",
): string => {
  if (!date) return "";
  const formatDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: variant === "date_time" ? "2-digit" : undefined,
    minute: variant === "date_time" ? "2-digit" : undefined,
    second: variant === "date_time" ? "2-digit" : undefined,
  };
  return new Intl.DateTimeFormat("ru-RU", options).format(formatDate);
};
