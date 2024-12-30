import type { Font } from "@app/theme/font";
import type { Colors } from "@app/theme/colors";
import type { TextProps } from "react-native";

type FontFamily = Font.TITLE | Font.TEXT | string;
type FontColors = Colors;

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5";
type Style = "normal";
export type Weight = "300" | "400" | "500" | "600" | "700";

export type TypographyFont = {
  color: FontColors;
  fontFamily: FontFamily;
  fontStyle: Style;
  fontWeight: Weight;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
};

export type TypographyProps = TextProps &
  Partial<
    {
      variant: TypographyVariant;
    } & TypographyFont
  >;
