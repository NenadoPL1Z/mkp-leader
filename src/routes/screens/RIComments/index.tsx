import React from "react";
import { ScrollView, Text, View } from "react-native";
import ScreenContainer from "@app/containers/ScreenContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderUI from "@app/ui/HeaderUI";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size.ts";
import ButtonUI from "@app/ui/ButtonUI";
import { ACTIVE_COMMENTS_BY_STATUS } from "@app/routes/screens/RIComments/constants.ts";
import { useRIComments } from "./useRIComments.ts";
import { styles } from "./styles.ts";
import { COMMENT_BUTTON } from "../constants.ts";
import type { RICommentsProps } from "./types.ts";

const RIComments = ({ route: { params } }: RICommentsProps) => {
  const { comments, service } = params;
  const { top, bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || styles.bottom.paddingVertical;

  const { toast, onHideToast } = useRIComments();

  const isActiveComments = ACTIVE_COMMENTS_BY_STATUS.has(service.status);
  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <HeaderUI
        title="Комментарии"
        isOverLinear={true}
      />
      <ScrollView style={styles.container}>
        <Text>{JSON.stringify(comments)}</Text>
      </ScrollView>
      <ToastUI
        params={{
          ...toast,
          isVisible: !!toast,
          onHide: onHideToast,
          bottomOffset: Size.BUTTON + 30,
        }}
      />
      <View style={[styles.bottom, { paddingBottom }]}>
        {isActiveComments && <ButtonUI>{COMMENT_BUTTON}</ButtonUI>}
      </View>
    </ScreenContainer>
  );
};

export default React.memo(RIComments);
