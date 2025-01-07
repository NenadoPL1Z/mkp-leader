import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgBeforeDate = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 14"
    {...props}>
    <Path
      fill="currentColor"
      d="M5.433 13.282c-3.254 0-5.287-2.407-5.287-6.259v-.016C.146 3.147 2.17.74 5.425.74c2.523 0 4.49 1.585 4.848 3.885l-.009.016H8.762l-.009-.016c-.398-1.536-1.676-2.507-3.328-2.507-2.3 0-3.744 1.892-3.744 4.889v.016c0 2.997 1.444 4.881 3.752 4.881 1.669 0 2.939-.855 3.312-2.233l.017-.016h1.51v.016c-.398 2.192-2.29 3.611-4.839 3.611"
    />
  </Svg>
);
export default SvgBeforeDate;
