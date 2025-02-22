import { getUppercaseFirstLetter } from "@app/lib/functions/getUppercaseFirstLetter";
import { useMemo } from "react";
import { Font } from "@app/theme/font";
import { Colors, colorsAvatar } from "@app/theme/colors";
import { DEFAULT_SIZE } from "./constants.ts";
import type { AvatarProps } from "@rneui/themed";
import type { AvatarUIProps } from "@app/ui/AvatarUI/types";

export const useAvatarUI = ({
  size = DEFAULT_SIZE,
  name,
  phone = "0",
  isDefault,
}: AvatarUIProps) => {
  const title = isDefault ? "" : getTitle(name);

  const fontSize = useMemo(() => {
    return getFontSize(size);
  }, [size]);

  const lastIndex = +(phone[phone?.length - 1] || 0);
  const backgroundColor = colorsAvatar[lastIndex] || Colors.PRIMARY;

  const moreAvatarProps: AvatarProps = {
    title: title,
    titleStyle: {
      fontFamily: Font.TEXT,
      fontWeight: "400",
      fontSize,
    },
    containerStyle: {
      backgroundColor,
    },
  };

  return { moreAvatarProps, backgroundColor };
};

const getTitle = (name: string) => {
  const splitName = name.split(" ");
  const firstName = splitName[0] || "";
  const lastName = splitName.slice(1).join(" ") || "";

  const formatFirstName = getUppercaseFirstLetter(firstName);
  const formatLastName = getUppercaseFirstLetter(lastName);

  return `${formatFirstName}${formatLastName}`.trim();
};

const getFontSize = (size: number) => {
  switch (size) {
    case 104:
      return 40;
    case 88:
      return 34;
    default:
      return 17;
  }
};
