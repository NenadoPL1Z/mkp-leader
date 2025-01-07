import Svg, { G, Rect, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgCheckBox = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <G clipPath="url(#CheckBox_svg__a)">
      <Rect
        width={19}
        height={19}
        x={0.5}
        y={0.5}
        stroke="#D4D4D4"
        rx={4.5}
      />
    </G>
    <Defs>
      <ClipPath id="CheckBox_svg__a">
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
export default SvgCheckBox;
