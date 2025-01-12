import { Response } from "../constants/response.ts";

export const getErrorText = (error?: unknown) => {
  return error === "string" ? error : Response.UNKNOWN;
};
