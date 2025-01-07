import Svg, { Mask, Path, G } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgBasketIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}>
    <Mask
      id="BasketIcon_svg__a"
      width={25}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}>
      <Path
        fill="#D9D9D9"
        d="M.5 0h24v24H.5z"
      />
    </Mask>
    <G mask="url(#BasketIcon_svg__a)">
      <Path
        fill="currentColor"
        d="M7.5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 5.5 19V6a.97.97 0 0 1-.713-.287A.97.97 0 0 1 4.5 5q0-.424.287-.713A.97.97 0 0 1 5.5 4h4q0-.424.287-.712A.97.97 0 0 1 10.5 3h4q.424 0 .713.288.287.287.287.712h4q.424 0 .712.287.288.288.288.713 0 .424-.288.713A.97.97 0 0 1 19.5 6v13q0 .824-.587 1.413A1.93 1.93 0 0 1 17.5 21zm10-15h-10v13h10zm-7 11q.424 0 .713-.288A.97.97 0 0 0 11.5 16V9a.97.97 0 0 0-.287-.713A.97.97 0 0 0 10.5 8a.97.97 0 0 0-.713.287A.97.97 0 0 0 9.5 9v7q0 .424.287.712.288.288.713.288m4 0q.424 0 .713-.288A.97.97 0 0 0 15.5 16V9a.97.97 0 0 0-.287-.713A.97.97 0 0 0 14.5 8a.97.97 0 0 0-.713.287A.97.97 0 0 0 13.5 9v7q0 .424.287.712.288.288.713.288"
      />
    </G>
  </Svg>
);
export default SvgBasketIcon;
