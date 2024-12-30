import React, { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import HeaderUI from "@app/ui/HeaderUI";
import ButtonUI from "@app/ui/ButtonUI";
import { Size } from "@app/lib/constants/size";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextAreaUI from "@app/ui/TextAreaUI/TextAreaUI";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import { Colors } from "@app/theme/colors";
import { Timing } from "@app/lib/constants/timing";
import { Count } from "@app/lib/constants/count";
import ToastUI from "@app/ui/ToastUI";
import { IS_ANDROID } from "@app/lib/constants";
import type { TextFieldRef } from "@app/types/general";
import type { AMRCommentScreenProps } from "../../types";

const AMRComment = ({
  route: {
    params: { initialValue, onChange },
  },
  navigation,
}: AMRCommentScreenProps) => {
  const inputRef = useRef<TextFieldRef>(null);
  const { top, bottom } = useSafeAreaInsets();

  const [value, setValue] = useState<string>(initialValue);
  const [toast, setToast] = useState<string>("");
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const buttonText = initialValue.length ? "Изменить" : "Сохранить";
  const isMax = value.length > Count.DESCRIPTION;

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const onClear = () => {
    setValue("");
  };

  const onSave = () => {
    //? RETURN EXIST
    if (isMax) {
      setToast(`Максимальное количество символов ${Count.DESCRIPTION}`);
      return;
    }

    onChange(value);
    navigation.goBack();
  };

  useEffect(() => {
    if (!IS_ANDROID) {
      return;
    }

    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, Timing.KEYBOARD_OPEN);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top, paddingBottom: bottom - ten },
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
            { paddingBottom: bottom ? ten : styles.bottom.paddingTop },
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
          <ButtonUI onPress={onSave}>{buttonText}</ButtonUI>
        </View>
      </KeyboardContainer>
    </View>
  );
};

const ten = 10;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  main: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },
  inputContainerStyle: {
    borderRadius: 0,
    height: "100%",
    backgroundColor: Colors.WHITE,
  },
  inputStyle: {
    maxHeight: undefined,
    height: "100%",
  },
  bottom: {
    flex: 0,
    paddingTop: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
});

export default React.memo(AMRComment);
