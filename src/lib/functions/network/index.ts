import { isAxiosError } from "axios";

export const isNetworkError = (error: unknown): boolean => {
  if (isAxiosError(error)) {
    return error.code == "ERR_NETWORK";
  }
  return false;
};

export const isServerCrash = (error: unknown): boolean => {
  if (isAxiosError(error)) {
    return error.response?.status === 500;
  }
  return false;
};

export const isSessionExpired = (error: unknown): boolean => {
  if (isAxiosError(error)) {
    return error.response?.data?.detail === "Invalid token";
  }
  return false;
};

export const isRefreshExist = (error: unknown) => {
  if (isAxiosError(error)) {
    return error.response?.data?.detail === "Refresh token is not valid.";
  }
  return false;
};
