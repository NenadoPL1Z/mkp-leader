import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgEyeShow = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 23 16"
    {...props}>
    <Path
      fill="currentColor"
      d="M22.52 7.7c-.03-.08-.83-1.84-2.59-3.6a11.97 11.97 0 0 0-8.6-3.6C8.07.5 5.1 1.75 2.74 4.1A13.2 13.2 0 0 0 .16 7.7a.74.74 0 0 0 0 .6c.03.07.83 1.84 2.59 3.6a11.97 11.97 0 0 0 8.6 3.6c3.27 0 6.24-1.25 8.6-3.6a13.2 13.2 0 0 0 2.58-3.6.74.74 0 0 0 0-.6ZM11.34 14a10.3 10.3 0 0 1-7.5-3.12A12.2 12.2 0 0 1 1.68 8c.57-1.06 1.3-2.04 2.16-2.89A10.32 10.32 0 0 1 11.34 2c2.88 0 5.4 1.05 7.49 3.11.86.85 1.59 1.83 2.16 2.89-.67 1.27-3.62 6-9.65 6m0-10.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m0 7.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
    />
  </Svg>
);
export default SvgEyeShow;
