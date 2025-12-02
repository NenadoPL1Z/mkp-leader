import { REG_EXP } from "./constants.ts";

export const matchOnlyLatinCharacters = (value: string) => {
  return REG_EXP.test(value);
};
