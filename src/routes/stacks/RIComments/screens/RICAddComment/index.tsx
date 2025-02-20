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
import { useRICAddComment } from "./useRICAddComment.ts";
// import type { RICAddCommentScreenProps } from "../../types.ts";

const RICAddComment = () => {
  const { top, bottom } = useSafeAreaInsets();
  const {
    value,
    inputRef,
    isMax,
    toast,
    keyboardHeight,
    onChangeText,
    onClear,
    onSave,
    setToast,
  } = useRICAddComment();

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
            subtitle: `${value.length} / ${Count.DESCRIPTION}`,
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
            value={value}
            onChangeText={onChangeText}
            onClear={onClear}
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
                text1: toast,
                isVisible: true,
                onHide: () => setToast(""),
                bottomOffset: Size.BUTTON + 20,
              }}
            />
          )}
          <ButtonUI onPress={onSave}>Отправить</ButtonUI>
        </View>
      </KeyboardContainer>
    </View>
  );
};

export default React.memo(RICAddComment);
