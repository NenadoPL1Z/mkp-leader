import { Response } from "../constants/response.ts";

export const getErrorText = (error?: unknown): string => {
  if (typeof error === "string") return error;
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  )
    return error.message;
  return Response.UNKNOWN;
};
