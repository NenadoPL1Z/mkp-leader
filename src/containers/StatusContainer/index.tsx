import React, { useMemo } from "react";

import LoadingContainer from "./components/LoadingContianer";
import ErrorContainer from "./components/ErrorContainer";
import type { StatusContainerProps } from "./types";

const StatusContainer = ({
  isError,
  isLoading,
  LoadingComponent,
  errorProps,
  loadingProps = {},
  children,
}: StatusContainerProps) => {
  const Loading = useMemo(
    () => ({
      Component: LoadingComponent ? LoadingComponent : LoadingContainer,
      props: LoadingComponent ? {} : loadingProps,
    }),
    [LoadingComponent, loadingProps],
  );

  const isDisplayError = isError && !isLoading;
  const isDisplayChildren = !isError && !isLoading;

  return (
    <>
      {isLoading && <Loading.Component {...Loading.props} />}
      {isDisplayError && <ErrorContainer {...errorProps} />}
      {isDisplayChildren && children}
    </>
  );
};

export default React.memo(StatusContainer);
