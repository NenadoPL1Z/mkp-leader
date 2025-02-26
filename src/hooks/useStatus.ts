import { useMemo, useState } from "react";

interface StatusState {
  isLoading: boolean;
  hasError: string;
}

export type ChangeStatusFunctionType = (status: Partial<StatusState>) => void;

type NotRequiredStatus = Partial<StatusState>;

export const useStatus = (initialArg?: NotRequiredStatus) => {
  const initialState: StatusState = {
    isLoading: true,
    hasError: "",
    ...initialArg,
  };

  const [status, setStatus] = useState<StatusState>(initialState);
  const { isLoading, hasError } = status;

  const isError = useMemo(() => {
    return !!hasError;
  }, [hasError]);

  const handleChangeStatus: ChangeStatusFunctionType = (state) => {
    setStatus((prevState) => {
      return { ...prevState, ...state };
    });
  };

  const handleLoadingStatus = () => {
    handleChangeStatus({ isLoading: true, hasError: "" });
  };

  const handleErrorStatus = (
    hasError: Pick<StatusState, "hasError">["hasError"],
  ) => {
    handleChangeStatus({ isLoading: false, hasError });
  };

  const handleClearStatus = () => {
    setStatus({ isLoading: false, hasError: "" });
  };

  return {
    isLoading,
    isError,
    hasError,
    handleChangeStatus,
    handleLoadingStatus,
    handleErrorStatus,
    handleClearStatus,
  };
};
