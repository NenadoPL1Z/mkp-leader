import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import HeaderUI from "@app/ui/HeaderUI";
import { Size } from "@app/lib/constants/size";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import RICompany from "@app/components/RequestInfo/components/RICompany";
import RIEmergency from "@app/components/RequestInfo/components/RIEmergency";
import RIContent from "@app/components/RequestInfo/components/RIContent";
import RIExecutors from "@app/components/RequestInfo/components/RIExecutors";
import ToastUI from "@app/ui/ToastUI";
import RequestInfo from "@app/components/RequestInfo";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { Portal } from "@app/theme/portal";
import RIComment from "@app/components/RequestInfo/components/RIComment";
import { RICommentsSN } from "@app/routes/stacks/RIComments/types.ts";
import EMRIMediaUploadForm from "./components/EMRIMediaUploadForm";
import { useEMRInfo } from "./useEMRInfo";
import { EMRequestsSN } from "../../types";
import type { EMRInfoScreenProps } from "@app/routes/executor/stacks/EMain/screens/EMRequests/types";

const EMRInfo = (props: EMRInfoScreenProps) => {
  const { route, navigation } = props;
  const { params } = route;
  const { tabName, card, counter } = params;

  const { bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || 10;

  const { toast, currenTabRef, handleVerify } = useEMRInfo(props);

  return (
    <PortalProvider>
      <RequestInfo
        role="executor"
        card={card}
        setCardRef={currenTabRef?.setCardRef?.current}
        onDecrementUnreadCounter={counter.onDecrementUnreadCounter}>
        {({ data, onUpdateData }) => {
          const isDisplayForm =
            tabName === "work" &&
            !data.media_files?.find(
              (item) => item.owner_type === "Исполнитель",
            );

          return (
            <>
              <HeaderUI
                right={{
                  subtitle: formatDateTime(data.created_at),
                  variant: "text",
                  activeOpacity: 1,
                }}
              />
              <KeyboardContainer>
                <ScrollView
                  style={styles.scroll}
                  contentContainerStyle={[styles.container, { paddingBottom }]}
                  automaticallyAdjustKeyboardInsets={true}
                  keyboardDismissMode="on-drag">
                  <RICompany {...data.customer} />
                  <RIEmergency emergency={data.emergency} />
                  <RIContent
                    title={data.title}
                    description={data.description}
                    material_availability={data.material_availability}
                    media_files={data.media_files}
                  />
                  <RIComment
                    serviceId={data.id}
                    onShowToast={(text1) => toast.onShowToast({ text1 })}
                    onPushToComments={(comments, handleUpdateComments) =>
                      navigation.navigate(EMRequestsSN.COMMENTS, {
                        screen: RICommentsSN.HOME,
                        params: {
                          service: data,
                          initialComments: comments,
                          handleUpdateInitialComments: handleUpdateComments,
                        },
                      })
                    }
                  />
                  <RIExecutors {...data}>
                    {isDisplayForm && (
                      <EMRIMediaUploadForm
                        id={data.id}
                        onVerify={handleVerify(onUpdateData)}
                      />
                    )}
                  </RIExecutors>
                </ScrollView>
                <ToastUI
                  params={{
                    isVisible: Boolean(toast.toast),
                    ...toast.toast,
                    onHide: toast.onHideToast,
                    bottomOffset: bottom,
                  }}
                />
              </KeyboardContainer>
            </>
          );
        }}
      </RequestInfo>
      <PortalHost name={Portal.REQUEST_FOOTER} />
    </PortalProvider>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 0,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
});

export default React.memo(EMRInfo);
