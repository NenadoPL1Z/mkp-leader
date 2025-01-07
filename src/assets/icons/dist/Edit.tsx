import Svg, { Mask, Path, G } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const SvgEdit = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Mask
      id="Edit_svg__a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}>
      <Path
        fill="currentColor"
        d="M0 0h24v24H0z"
      />
    </Mask>
    <G mask="url(#Edit_svg__a)">
      <Path
        fill="currentColor"
        d="M4 24q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 22q0-.824.587-1.413A1.93 1.93 0 0 1 4 20h16q.824 0 1.413.587Q22 21.176 22 22q0 .824-.587 1.413A1.93 1.93 0 0 1 20 24zm2-8h1.4l7.8-7.775L13.775 6.8 6 14.6zm-2 1v-2.825q0-.2.075-.388a1 1 0 0 1 .225-.337L15.2 2.575q.275-.275.638-.425Q16.2 2 16.6 2t.775.15.675.45L19.425 4q.3.275.438.65.137.375.137.775 0 .375-.137.737a1.9 1.9 0 0 1-.438.663L8.55 17.7q-.15.15-.338.225-.187.075-.387.075H5a.97.97 0 0 1-.713-.288A.97.97 0 0 1 4 17"
      />
    </G>
  </Svg>
);
export default SvgEdit;
