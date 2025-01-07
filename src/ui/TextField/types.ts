import type { FieldError } from "react-hook-form";
import type { SvgProps } from "react-native-svg";
import type { TouchableOpacityProps } from "react-native";
import type { SvgFC } from "@app/types/general";
import type { InputProps } from "@rneui/base";

export type TextFieldVariant = "outlined" | "contained";

export type TextFieldHorizontal = TouchableOpacityProps & {
  Icon: SvgFC;
  iconProps?: SvgProps;
  inputStyle?: Pick<InputProps, "inputStyle">["inputStyle"];
};

export type TextFieldError = Partial<FieldError | undefined>;

//? More
type MoreOptions = {
  variant: TextFieldVariant;
  required: boolean;
  isClear: boolean;
  left: TextFieldHorizontal | undefined;
  right: TextFieldHorizontal | undefined;
  error: TextFieldError;
  onClear: () => void;
};

export type TextFieldProps = Omit<InputProps, "rightIcon"> &
  Partial<MoreOptions>;
