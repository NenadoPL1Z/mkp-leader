import React from "react";
import { useCRInfo } from "@app/routes/customer/stacks/CRequests/screens/CRInfo/useCRInfo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import { Size } from "@app/lib/constants/size";
import RequestInfo from "@app/components/RequestInfo";
import HeaderUI from "@app/ui/HeaderUI";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import RIEmergency from "@app/components/RequestInfo/components/RIEmergency";
import RIContent from "@app/components/RequestInfo/components/RIContent";
import RIExecutors from "@app/components/RequestInfo/components/RIExecutors";
import ToastUI from "@app/ui/ToastUI";
import { Colors } from "@app/theme/colors";
import RIComment from "@app/components/RequestInfo/components/RIComment";
import { RICommentsSN } from "@app/routes/stacks/RIComments/types.ts";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { Portal } from "@app/theme/portal.ts";
import { CRIDelete } from "./components/CRIDelete/CRIDelete.tsx";
import { CRequestsSN } from "../../types";
import type { CRInfoScreenProps } from "../../types";

const CRInfo = (props: CRInfoScreenProps) => {
  const { route, navigation } = props;
  const { params } = route;
  const { card, counter, tabName } = params;

  const { bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || 10;

  const { isEdit, toast, currenTabRef, handleDelete, handlePush } =
    useCRInfo(props);

  return (
    <PortalProvider>
      <RequestInfo
        role="customer"
        card={card}
        setCardRef={currenTabRef?.setCardRef?.current}
        onDecrementUnreadCounter={counter.onDecrementUnreadCounter}>
        {({ data, onUpdateData }) => {
          const isDisplayDelete =
            tabName === "work" && data.status === "В работе";
          return (
            <>
              <HeaderUI
                right={{
                  iconProps: { color: Colors.GRAY_TEN },
                  subtitle: formatDateTime(data.created_at),
                  variant: isEdit ? "edit" : "text",
                  activeOpacity: isEdit ? undefined : 1,
                  onPress: isEdit
                    ? () => handlePush(data, onUpdateData)
                    : undefined,
                }}
              />
              <KeyboardContainer>
                <ScrollView
                  style={styles.scroll}
                  contentContainerStyle={[styles.container, { paddingBottom }]}
                  automaticallyAdjustKeyboardInsets={true}
                  keyboardDismissMode="on-drag">
                  <RIEmergency
                    isPaddingLeft={false}
                    emergency={data.emergency}
                  />
                  <View style={styles.top}>
                    <RIContent
                      title={data.title}
                      description={data.description}
                      material_availability={data.material_availability}
                      media_files={data.media_files}
                    />
                  </View>
                  <RIComment
                    serviceId={data.id}
                    onShowToast={(text1) => toast.onShowToast({ text1 })}
                    onPushToComments={(comments, handleUpdateComments) =>
                      navigation.navigate(CRequestsSN.COMMENTS, {
                        screen: RICommentsSN.HOME,
                        params: {
                          service: data,
                          initialComments: comments,
                          handleUpdateInitialComments: handleUpdateComments,
                        },
                      })
                    }
                  />
                  <RIExecutors {...data} />
                  {isDisplayDelete && (
                    <CRIDelete
                      id={data.id}
                      onDelete={handleDelete}
                    />
                  )}
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
  top: {
    paddingTop: 3,
  },
});

export default React.memo(CRInfo);
