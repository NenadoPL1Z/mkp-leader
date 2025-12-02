import { REG_EXP } from "./constants.ts";

export const matchAtLeastOneSpecialCharacter = (value: string) => {
  return REG_EXP.test(value);
};
