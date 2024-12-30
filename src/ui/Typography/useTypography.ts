import { Colors } from "@app/theme/colors";
import { Font } from "@app/theme/font";
import type { TypographyFont, TypographyVariant, Weight } from "./types";
import type { TypographyProps } from "@app/ui/Typography/types";

const h1: TypographyFont = {
  color: Colors.TEXT,
  fontFamily: Font.TITLE,
  fontSize: 34,
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: 40,
  letterSpacing: 0.139,
};

const h2: TypographyFont = {
  color: Colors.TEXT,
  fontFamily: Font.TITLE,
  fontSize: 26,
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: 32,
};

const h3: TypographyFont = {
  color: Colors.TEXT,
  fontFamily: Font.TEXT,
  fontSize: 17,
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: 20,
};

const h4: TypographyFont = {
  color: Colors.TEXT,
  fontFamily: Font.TEXT,
  fontSize: 13,
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: 15,
  letterSpacing: -0.01,
};

const h5: TypographyFont = {
  color: Colors.TEXT,
  fontFamily: Font.TEXT,
  fontSize: 13,
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: 15,
};

const variantConfig: Record<TypographyVariant, TypographyFont> = {
  h1,
  h2,
  h3,
  h4,
  h5,
};

export const useTypography = (props: TypographyProps) => {
  const {
    variant = "h2",
    color,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    lineHeight,
    letterSpacing,
  } = props;

  const variantStyle = variantConfig[variant];

  const customStyle: TypographyFont = {
    color: color || variantStyle.color,
    fontFamily: fontFamily || variantStyle.fontFamily,
    fontSize: fontSize || variantStyle.fontSize,
    fontStyle: fontStyle || variantStyle.fontStyle,
    fontWeight: fontWeight || variantStyle.fontWeight,
    lineHeight: lineHeight || variantStyle.lineHeight,
    letterSpacing: letterSpacing || variantStyle.letterSpacing || 0,
  };

  customStyle.fontFamily = `${customStyle.fontFamily}-${getFontWeight(
    customStyle.fontWeight,
  )}`;

  return { customStyle };
};

const getFontWeight = (fontWeight: Weight) => {
  switch (fontWeight) {
    case "300":
      return "Light";
    case "400":
      return "Regular";
    case "500":
      return "Medium";
    case "600":
      return "Semibold";
    case "700":
      return "Bold";
    default:
      return "Regular";
  }
};
