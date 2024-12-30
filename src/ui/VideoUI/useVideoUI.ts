import { useState } from "react";
import type { LoadError } from "react-native-video";

export const useVideoUI = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState("");
  const handleLoad = () => {
    setIsLoading(false);
  };
  const handleError = (e: LoadError) => {
    setIsLoading(false);
    setHasError(JSON.stringify(e));
  };

  const onRetry = () => {
    setIsLoading(true);
    setHasError("");
  };

  return {
    isLoading,
    hasError,
    handleLoad,
    handleError,
    onRetry,
  };
};
