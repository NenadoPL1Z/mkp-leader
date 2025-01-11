import React from "react";
import RequestInfo from "@app/components/RequestInfo";
import HeaderUI from "@app/ui/HeaderUI";
import RICompany from "@app/components/RequestInfo/components/RICompany";
import { ScrollView } from "react-native";
import RIEmergency from "@app/components/RequestInfo/components/RIEmergency";
import RIContent from "@app/components/RequestInfo/components/RIContent";
import RIExecutorForm from "@app/components/RequestInfo/components/RIExecutorForm";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import RIExecutor from "@app/components/RequestInfo/components/RIExecutor";
import ToastUI from "@app/ui/ToastUI";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { Portal } from "@app/theme/portal";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { Colors } from "@app/theme/colors";
import { useBottomOffset } from "@app/hooks/useBottomOffset";
import { useAMRInfo } from "./useAMRInfo";
import { styles } from "./styles";
import AMRIClose from "./components/AMRIClose";
import type { AMRInfoScreenProps } from "../../types";

const AMRInfo = (props: AMRInfoScreenProps) => {
  const { route } = props;
  const { params } = route;
  const { card, counter, tabName } = params;

  const bottom = useBottomOffset();

  const {
    toast,
    editMode,
    currenTabRef,
    handleChangeEditMode,
    handleChangePrevScreenInfo,
    handleClose,
  } = useAMRInfo(props);

  return (
    <PortalProvider>
      <RequestInfo
        role="admin"
        card={card}
        setCardRef={currenTabRef?.setCardRef?.current}
        onDecrementCounter={counter.onDecrementCounter}>
        {({ data, onUpdateData }) => {
          //? CONSTANTS
          const isExecutor = data?.executor?.id;

          const isEnableEdit =
            !!isExecutor && (tabName === "work" || tabName === "quality");
          const isEditMode = isEnableEdit && editMode.isToggle;

          const isDisplayForm = !isExecutor || isEditMode;
          const isDisplayExecutor = isExecutor && !isDisplayForm;
          const isDisplayClose =
            !isEditMode &&
            tabName === "quality" &&
            data.status === "Контроль качества";

          return (
            <>
              <HeaderUI
                right={{
                  subtitle: formatDateTime(data.created_at),
                  variant: isEnableEdit ? "edit" : "text",
                  activeOpacity: isEnableEdit ? undefined : 1,
                  onPress: isEnableEdit ? handleChangeEditMode : undefined,
                  iconProps: {
                    color: isEditMode ? Colors.MAIN : Colors.GRAY_TEN,
                  },
                }}
              />
              <KeyboardContainer>
                <ScrollView
                  style={styles.scroll}
                  contentContainerStyle={[styles.container]}
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
                  {isDisplayForm && (
                    <RIExecutorForm
                      {...data}
                      isEditMode={isEditMode}
                      onAssignExecutor={handleChangePrevScreenInfo(
                        onUpdateData,
                      )}
                    />
                  )}
                  {isDisplayExecutor && <RIExecutor {...data} />}
                  {isDisplayClose && (
                    <AMRIClose
                      id={data.id}
                      onClose={handleClose(onUpdateData)}
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

export default React.memo(AMRInfo);
