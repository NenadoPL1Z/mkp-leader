import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgHomeIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="currentColor"
      d="M2.999 21.333h4v-6.667q0-.566.383-.95a1.3 1.3 0 0 1 .95-.383h5.333q.567 0 .95.383.384.383.384.95v6.667h4v-12l-8-6-8 6zm-2.667 0v-12q0-.635.283-1.2.284-.567.784-.934l8-6a2.57 2.57 0 0 1 1.6-.533q.9 0 1.6.533l8 6q.5.367.783.934.283.566.283 1.2v12q0 1.099-.783 1.883a2.57 2.57 0 0 1-1.883.783h-5.334a1.3 1.3 0 0 1-.95-.383 1.3 1.3 0 0 1-.383-.95v-6.667H9.665v6.667q0 .567-.383.95a1.3 1.3 0 0 1-.95.383H2.999a2.57 2.57 0 0 1-1.884-.783 2.57 2.57 0 0 1-.783-1.883"
    />
  </Svg>
);
export default SvgHomeIcon;
