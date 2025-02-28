export const EU_DATE_FORMAT = "DD.MM.YYYY";
export const EU_TIME_FORMAT = "HH:mm:ss";
export const EU_FULL_FORMAT = `${EU_DATE_FORMAT}, ${EU_TIME_FORMAT}`;

export const USER_TIMEZONE_OFFSET = Math.abs(
  new Date().getTimezoneOffset() / 60,
);
