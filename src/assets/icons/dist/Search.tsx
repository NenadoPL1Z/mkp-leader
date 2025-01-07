import Svg, { Mask, Path, G } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgSearch = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}>
    <Mask
      id="Search_svg__a"
      width={25}
      height={25}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}>
      <Path
        fill="currentColor"
        d="M.072.5h24v24h-24z"
      />
    </Mask>
    <G mask="url(#Search_svg__a)">
      <Path
        fill="currentColor"
        d="M9.572 16.5q-2.725 0-4.612-1.887T3.072 10 4.96 5.388 9.572 3.5t4.613 1.888T16.072 10a6.1 6.1 0 0 1-1.3 3.8l5.6 5.6a.95.95 0 0 1 .275.7.95.95 0 0 1-.275.7.95.95 0 0 1-.7.275.95.95 0 0 1-.7-.275l-5.6-5.6q-.75.6-1.725.95-.974.35-2.075.35m0-2q1.875 0 3.188-1.312 1.312-1.313 1.312-3.188T12.76 6.813 9.572 5.5 6.385 6.813 5.072 10t1.313 3.188T9.572 14.5"
      />
    </G>
  </Svg>
);
export default SvgSearch;
