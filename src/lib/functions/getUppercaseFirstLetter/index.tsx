export const getUppercaseFirstLetter = (letter: string) => {
  if (!letter) {
    return "";
  }
  return `${letter[0].toUpperCase()}`;
};
