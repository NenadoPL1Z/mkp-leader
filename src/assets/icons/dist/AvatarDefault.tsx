import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgAvatarDefault = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 40 40"
    {...props}>
    <G clipPath="url(#AvatarDefault_svg__a)">
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M40 20c0 4.695-1.618 9.013-4.327 12.425C32.01 37.04 26.35 40 20 40S7.99 37.04 4.327 32.425A19.9 19.9 0 0 1 0 20C0 8.954 8.954 0 20 0s20 8.954 20 20m-6.939 9.243a6 6 0 0 0-.261-.143 29.7 29.7 0 0 0-6.3-2.325A27.5 27.5 0 0 0 20 26q-3.3 0-6.5.775A29.7 29.7 0 0 0 7.2 29.1a6 6 0 0 0-.261.143C9.837 33.332 14.607 36 20 36s10.163-2.668 13.061-6.757M20 24q-3.3 0-5.65-2.35T12 16t2.35-5.65T20 8t5.65 2.35T28 16t-2.35 5.65T20 24"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="AvatarDefault_svg__a">
        <Rect
          width="100%"
          height="100%"
          fill="currentColor"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgAvatarDefault;
