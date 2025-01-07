import React from "react";

import { Avatar } from "@rneui/base";
import { AvatarDefaultIcon } from "@app/assets/icons/dist";
import { useAvatarUI } from "./useAvatarUI";
import type { AvatarUIProps } from "./types";

const AvatarUI = (props: AvatarUIProps) => {
  const { size, isDefault, avatarProps = {} } = props;
  const { moreAvatarProps, backgroundColor } = useAvatarUI(props);

  if (isDefault) {
    return (
      <AvatarDefaultIcon
        width={size}
        height={size}
        color={backgroundColor}
      />
    );
  }

  return (
    <Avatar
      rounded={true}
      size={size}
      {...avatarProps}
      {...moreAvatarProps}
      titleStyle={[moreAvatarProps?.titleStyle, avatarProps?.titleStyle]}
      containerStyle={[
        moreAvatarProps?.containerStyle,
        avatarProps?.containerStyle,
      ]}
    />
  );
};

export default React.memo(AvatarUI);
