import { useEffect, useRef, useState } from "react";
import { Count } from "@app/lib/constants/count.ts";
import { IS_ANDROID } from "@app/lib/constants";
import { Keyboard } from "react-native";
import { Timing } from "@app/lib/constants/timing.ts";
import type { TextFieldRef } from "@app/types/general.ts";

export const useRIComment = () => {
  const inputRef = useRef<TextFieldRef>(null);

  const [value, setValue] = useState("");
  const [toast, setToast] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const isMax = value.length > Count.DESCRIPTION;

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const onClear = () => {
    setValue("");
  };

  const onSave = () => {
    if (isMax) {
      setToast(`Максимальное количество символов ${Count.DESCRIPTION}`);
      return;
    }

    // onChange(value);
    // navigation.goBack();
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

  return {
    value,
    inputRef,
    isMax,
    toast,
    keyboardHeight,
    onChangeText,
    onClear,
    onSave,
    setToast,
  };
};
