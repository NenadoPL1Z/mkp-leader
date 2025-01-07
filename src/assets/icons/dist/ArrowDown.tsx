import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgArrowDown = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#E0E0E0"
      d="M19.193 8.833a1.136 1.136 0 0 0-1.408.16L12 14.787 5.87 8.775a1.092 1.092 0 0 0-1.537 1.55L12 18.02l7.395-7.422a1.136 1.136 0 0 0-.202-1.765"
    />
  </Svg>
);
export default SvgArrowDown;
