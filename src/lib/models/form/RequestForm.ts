import type { MediaForm } from "./MediaForm";
import type { Option } from "@app/types/general";

export type RequestFormModel = MediaForm & {
  title: string;
  emergency: boolean;
  description: string;
  material: Option;
};
