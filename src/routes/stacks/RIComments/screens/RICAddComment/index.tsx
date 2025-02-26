import React from "react";
import { View } from "react-native";
import HeaderUI from "@app/ui/HeaderUI";
import ButtonUI from "@app/ui/ButtonUI";
import { Size } from "@app/lib/constants/size";
import TextAreaUI from "@app/ui/TextAreaUI/TextAreaUI";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import { Colors } from "@app/theme/colors";
import { Count } from "@app/lib/constants/count";
import ToastUI from "@app/ui/ToastUI";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles.ts";
import { PADDING_BOTTOM } from "./constants.ts";
import { useRICAddComment, useKeyboardHeight } from "./hooks";
import type { RICAddCommentScreenProps } from "../../types.ts";

const RICAddComment = (props: RICAddCommentScreenProps) => {
  const { top, bottom } = useSafeAreaInsets();

  const {
    inputRef,
    isLoading,
    comment,
    toast,
    isMax,
    setComment,
    onHideToast,
    handleSubmit,
  } = useRICAddComment(props);

  const keyboardHeight = useKeyboardHeight();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top, paddingBottom: bottom - PADDING_BOTTOM },
      ]}>
      <KeyboardContainer>
        <HeaderUI
          right={{
            variant: "text",
            subtitle: `${comment.length} / ${Count.DESCRIPTION}`,
            subtitleColor: isMax ? Colors.ERROR : Colors.GRAY_SEVEN,
          }}
        />
        <View
          style={[
            styles.main,
            keyboardHeight ? { maxHeight: keyboardHeight - Size.HEADER } : {},
          ]}>
          <TextAreaUI
            ref={inputRef}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            placeholder="Комментарий"
            autoCorrect={true}
            autoCapitalize="none"
            numberOfLines={undefined}
            value={comment}
            onChangeText={setComment}
            onClear={() => setComment("")}
          />
        </View>
        <View
          style={[
            styles.bottom,
            {
              paddingBottom: bottom ? PADDING_BOTTOM : styles.bottom.paddingTop,
            },
          ]}>
          {Boolean(toast) && (
            <ToastUI
              params={{
                ...toast,
                isVisible: !!toast,
                onHide: onHideToast,
                bottomOffset: Size.BUTTON + 20,
              }}
            />
          )}
          <ButtonUI
            loading={isLoading}
            onPress={handleSubmit}>
            Отправить
          </ButtonUI>
        </View>
      </KeyboardContainer>
    </View>
  );
};

export default React.memo(RICAddComment);
