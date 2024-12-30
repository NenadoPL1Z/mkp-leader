import React from "react";
import HRLogout from "@app/ui/HeaderUI/HeaderRight/HRLogout";
import HREdit from "@app/ui/HeaderUI/HeaderRight/HREdit";
import HRDefault from "@app/ui/HeaderUI/HeaderRight/HRDefault";
import type { HeaderRightProps } from "@app/ui/HeaderUI/types";

const HeaderRight = ({ variant = "", ...props }: HeaderRightProps) => {
  switch (variant) {
    case "logout":
      return <HRLogout {...props} />;
    case "edit":
      return <HREdit {...props} />;
    case "text":
      return <HRDefault {...props} />;
    default:
      return null;
  }
};

export default React.memo(HeaderRight);
