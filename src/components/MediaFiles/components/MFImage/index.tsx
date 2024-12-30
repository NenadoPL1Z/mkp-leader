import React from "react";
import ImageUI from "@app/ui/ImageUI/ImageUI";
import { getImageById } from "@app/lib/api/media/getImageById";
import type { MediaFileModel } from "@app/lib/models/MediaFileModel";

type Props = MediaFileModel;

const MFImage = ({ id }: Props) => {
  return (
    <ImageUI
      uri={getImageById(id)}
      height={92}
    />
  );
};

export default React.memo(MFImage);
