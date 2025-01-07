import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgAfterDate = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 23 15"
    {...props}>
    <Path
      fill="currentColor"
      d="M2.218 14.366H.832v-3.71h.888c.872-.466 1.196-1.528 1.287-3.097L3.463.022h7.579v10.633h1.494v3.71H11.15V12H2.218zM4.41 7.592c-.083 1.353-.25 2.258-.839 2.964v.1h5.977v-9.29H4.8zm13.743 4.566c-2.549 0-4.126-1.76-4.126-4.624v-.016c0-2.872 1.577-4.624 4.126-4.624 2.548 0 4.125 1.752 4.125 4.624v.016c0 2.864-1.577 4.624-4.125 4.624m0-1.279c1.693 0 2.647-1.236 2.647-3.345v-.016c0-2.117-.954-3.346-2.648-3.346-1.693 0-2.648 1.229-2.648 3.346v.016c0 2.109.955 3.345 2.649 3.345"
    />
  </Svg>
);
export default SvgAfterDate;
