import { PrevIcon } from "@app/assets/icons/dist";
import { Colors } from "@app/theme/colors";
import type { TextFieldHorizontal } from "@app/ui/TextField/types";

export const TFLBack = (onPress: () => void): TextFieldHorizontal => {
  return {
    style: {
      width: 25,
      top: 8,
      right: 5,
    },
    onPress,
    Icon: PrevIcon,
    iconProps: { color: Colors.GRAY_TEN, width: 24, height: 24 },
  };
};
