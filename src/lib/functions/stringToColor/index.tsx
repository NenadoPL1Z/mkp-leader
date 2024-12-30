export const stringToColor = (str: string) => {
  let hash = 0;
  let color = "#";
  let i;
  let value;
  if (!str) {
    return color + "00A0AB";
  }
  const strLength = str.length;
  for (i = 0; i < strLength; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  for (i = 0; i < 3; i++) {
    value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(12)).substr(-2);
  }
  return color;
};
