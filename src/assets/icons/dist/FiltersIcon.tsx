import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgFiltersIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M7.501 19.25h13.498M7.5 19.25a2.25 2.25 0 1 0-4.499 0 2.25 2.25 0 0 0 4.5 0ZM16.5 12H3M20.999 12a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0ZM9.75 4.75H3.001M14.25 4.75h6.749M14.25 4.75a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0Z"
    />
  </Svg>
);
export default SvgFiltersIcon;
