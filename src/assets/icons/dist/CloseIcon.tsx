import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgCloseIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 23 23"
    {...props}>
    <Path
      fill="currentColor"
      d="M22.49.53a1.74 1.74 0 0 0-2.46 0L11.5 9.04 2.97.51A1.74 1.74 0 1 0 .51 2.97l8.53 8.53-8.53 8.53a1.74 1.74 0 1 0 2.46 2.46l8.53-8.53 8.53 8.53a1.74 1.74 0 1 0 2.46-2.46l-8.53-8.53 8.53-8.53c.66-.66.66-1.78 0-2.44"
    />
  </Svg>
);
export default SvgCloseIcon;
