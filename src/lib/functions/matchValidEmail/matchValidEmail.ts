import { REG_EXP } from "./constants.ts";

export const matchValidEmail = (email: string) => {
  return REG_EXP.test(email);
};
