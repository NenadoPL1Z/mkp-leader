declare module "*.svg" {
  import type React from "react";
  import type { SvgPropsFixed } from "@app/types/general.ts";

  const content: React.FC<SvgPropsFixed>;
  export default content;
}
