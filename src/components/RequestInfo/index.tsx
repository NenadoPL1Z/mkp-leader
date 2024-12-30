import React from "react";
import { useRequestInfo } from "@app/components/RequestInfo/useRequestInfo";
import StatusContainer from "@app/containers/StatusContainer";
import ScreenContainer from "@app/containers/ScreenContainer";
import HeaderUI from "@app/ui/HeaderUI";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RequestInfoProps } from "./types";

const RequestInfo = (props: RequestInfoProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const { isLoading, isError, childrenData, handleRetry } =
    useRequestInfo(props);

  const isDisplayHeader = isLoading || isError;
  const isDisplayChildren = Boolean(
    !isLoading && !isError && childrenData.data,
  );

  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      {isDisplayHeader && <HeaderUI />}
      <StatusContainer
        isLoading={isLoading}
        isError={isError}
        errorProps={{
          onPress: handleRetry,
          containerProps: { style: { paddingBottom: bottom } },
        }}>
        {isDisplayChildren ? props.children(childrenData) : null}
      </StatusContainer>
    </ScreenContainer>
  );
};

export default React.memo(RequestInfo);
