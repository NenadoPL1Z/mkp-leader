import type { MediaFileFormModel } from "@app/lib/models/MediaFileModel";

export type MUItemProps = MediaFileFormModel & {
  onDelete: (id: string) => void;
};
