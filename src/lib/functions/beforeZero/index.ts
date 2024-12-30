export const beforeZero = (str: string | number) => {
  const before = `${str}`.length === 1;
  return `${before ? 0 : ""}${str}`;
};
