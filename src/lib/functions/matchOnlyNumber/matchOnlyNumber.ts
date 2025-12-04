import { REG_EXP } from "./constants";

export const matchOnlyNumber = (value: string) => {
  return REG_EXP.test(value.trim());
};
