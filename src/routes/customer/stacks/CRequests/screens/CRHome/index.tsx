import React from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import TabBar from "@app/components/TabBar";
import { CustomerRootSN } from "@app/routes/customer/types";
import HeaderUI from "@app/ui/HeaderUI";
import { View } from "react-native";
import { Size } from "@app/lib/constants/size.ts";
import ButtonUI from "@app/ui/ButtonUI";
import ToastUI from "@app/ui/ToastUI";
import CRHTopBar from "./CRHTopBar";
import { styles } from "./styles";
import { useCRHome } from "./useCRHome";
import type { CRHomeScreenProps } from "../../types";

const CRHome = (props: CRHomeScreenProps) => {
  const { newRefs, toast, onHideToast, handlePushNew } = useCRHome(props);

  return (
    <TabBar activeRouteName={CustomerRootSN.REQUESTS}>
      <ScreenContainer>
        <HeaderUI
          title="Заявки"
          isBack={false}
        />
        <View style={styles.container}>
          <CRHTopBar newRefs={newRefs} />
          <ToastUI
            params={{
              ...toast,
              isVisible: !!toast,
              onHide: onHideToast,
              bottomOffset: Size.BUTTON + 30,
            }}
          />
        </View>
        <View style={styles.bottom}>
          <ButtonUI onPress={handlePushNew}>Создать заявку</ButtonUI>
        </View>
      </ScreenContainer>
    </TabBar>
  );
};

export default React.memo(CRHome);
