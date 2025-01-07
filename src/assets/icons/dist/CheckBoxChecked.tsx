import Svg, { G, Rect, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgCheckBoxChecked = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <G clipPath="url(#CheckBoxChecked_svg__a)">
      <Rect
        width={20}
        height={20}
        fill="currentColor"
        rx={5}
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2.5}
        d="m5 10.469 3.043 3.281L15 6.25"
      />
    </G>
    <Defs>
      <ClipPath id="CheckBoxChecked_svg__a">
        <Rect
          width={20}
          height={20}
          fill="#fff"
          rx={5}
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgCheckBoxChecked;
