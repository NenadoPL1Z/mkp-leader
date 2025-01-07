import Svg, { Mask, Path, G } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgSortIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Mask
      id="SortIcon_svg__a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}>
      <Path
        fill="#D9D9D9"
        d="M0 0h24v24H0z"
      />
    </Mask>
    <G mask="url(#SortIcon_svg__a)">
      <Path
        fill="currentColor"
        d="M9 13a.97.97 0 0 1-.713-.288A.97.97 0 0 1 8 12V5.825L6.125 7.7a.93.93 0 0 1-.688.275q-.412 0-.712-.275-.3-.3-.3-.713 0-.412.3-.712L8.3 2.7q.15-.15.325-.213.174-.062.375-.062.2 0 .375.062A.9.9 0 0 1 9.7 2.7l3.6 3.6q.3.3.287.7-.012.4-.312.7-.3.275-.7.287a.92.92 0 0 1-.7-.287L10 5.825V12q0 .424-.288.712A.97.97 0 0 1 9 13m6 8.575q-.2 0-.375-.063a.9.9 0 0 1-.325-.212l-3.6-3.6a.92.92 0 0 1-.288-.7q.013-.4.313-.7.3-.276.7-.288t.7.288L14 18.175V12q0-.426.287-.713A.97.97 0 0 1 15 11q.424 0 .712.287.288.288.288.713v6.175l1.875-1.875a.93.93 0 0 1 .687-.275q.413 0 .713.275.3.3.3.712 0 .413-.3.713L15.7 21.3q-.15.15-.325.212a1.1 1.1 0 0 1-.375.063"
      />
    </G>
  </Svg>
);
export default SvgSortIcon;
