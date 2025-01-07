import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgPrevIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="currentColor"
      d="M15.167 19.193a1.14 1.14 0 0 0-.16-1.408L9.213 12l6.012-6.13a1.092 1.092 0 0 0-1.55-1.537L5.98 12l7.422 7.395a1.136 1.136 0 0 0 1.765-.202"
    />
  </Svg>
);
export default SvgPrevIcon;
