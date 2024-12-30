import type { ButtonProps } from "@rneui/base";

type Variant =
  | "base"
  | "disabled"
  | "inverted"
  | "rounded"
  | "rounded-inverted"
  | "text";

type MoreOptions = {
  variant: Variant;
};

export type ButtonUIProps = ButtonProps & Partial<MoreOptions>;
