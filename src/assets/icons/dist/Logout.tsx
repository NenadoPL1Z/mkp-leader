import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgLogout = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}>
    <Path
      fill="#FF7A7A"
      d="M2 18q-.824 0-1.412-.587A1.93 1.93 0 0 1 0 16V2Q0 1.176.588.588A1.93 1.93 0 0 1 2 0h6q.424 0 .713.288Q9 .575 9 1q0 .424-.287.712A.97.97 0 0 1 8 2H2v14h6q.424 0 .713.288Q9 16.575 9 17q0 .424-.287.712A.97.97 0 0 1 8 18zm12.175-8H7a.97.97 0 0 1-.713-.287A.97.97 0 0 1 6 9q0-.424.287-.713A.97.97 0 0 1 7 8h7.175L12.3 6.125a.92.92 0 0 1-.275-.675q0-.4.275-.7a.95.95 0 0 1 .7-.312.95.95 0 0 1 .725.287L17.3 8.3q.3.3.3.7t-.3.7l-3.575 3.575a.93.93 0 0 1-.713.287 1.02 1.02 0 0 1-.712-.312.97.97 0 0 1-.263-.713.98.98 0 0 1 .288-.687z"
    />
  </Svg>
);
export default SvgLogout;
