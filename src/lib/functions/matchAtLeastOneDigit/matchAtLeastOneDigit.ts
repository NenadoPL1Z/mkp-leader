import { REG_EXP } from "./constants.ts";

export const matchAtLeastOneDigit = (value: string) => {
  return REG_EXP.test(value);
};
