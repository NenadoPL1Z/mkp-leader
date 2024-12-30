import { useState } from "react";

type StatusState = {
  isEnd: boolean;
  isLoading: boolean;
  hasError: string;
};

const initialStatusState: StatusState = {
  isLoading: true,
  isEnd: false,
  hasError: "",
};

export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState<number>(initialPage);

  const [status, setStatus] = useState<StatusState>(initialStatusState);
  const { isLoading, hasError, isEnd } = status;

  const handleResetPage = () => {
    setPage(initialPage);
    setStatus(initialStatusState);
  };

  const handleResetStatus = () => {
    setStatus(initialStatusState);
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangeStatus = (state: Partial<StatusState>) => {
    setStatus((prevState) => ({ ...prevState, ...state }));
  };

  const handleLoading = () => {
    handleChangeStatus({ isLoading: true, isEnd: false, hasError: "" });
  };

  const handleSuccess = (isEnd: boolean) => {
    handleChangeStatus({ isLoading: false, isEnd, hasError: "" });
    setPage((prevState) => prevState + 1);
  };

  const handleReject = (error: string) => {
    handleChangeStatus({ isLoading: false, isEnd: false, hasError: error });
  };

  return {
    page,
    isEnd,
    isLoading,
    hasError,

    handleResetPage,
    handleResetStatus,

    handleChangePage,
    handleChangeStatus,
    handleLoading,
    handleSuccess,
    handleReject,
  };
};
