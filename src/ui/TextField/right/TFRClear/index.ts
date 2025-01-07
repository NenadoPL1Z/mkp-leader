import CloseIcon from "@app/assets/icons/CloseIcon.svg";
import { Colors } from "@app/theme/colors";
import type { TextFieldHorizontal } from "@app/ui/TextField/types";
//? FIX_COMMIT

export const TFRClear = (
  isDisplay: boolean,
  isLabel: boolean,
  onPress: () => void,
): TextFieldHorizontal => {
  return {
    style: {
      width: 25,
      top: isLabel ? 28 : 8,
      right: 5,
      display: isDisplay ? undefined : "none",
    },
    onPress,
    inputStyle: { paddingRight: 35 },
    Icon: CloseIcon,
    iconProps: { style: { color: Colors.GRAY_FIVE }, width: 12, height: 12 },
  };
};
