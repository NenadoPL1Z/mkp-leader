import React from "react";
import { View } from "react-native";
import Typography from "@app/ui/Typography";
import { Font } from "@app/theme/font";
import { Colors } from "@app/theme/colors";
import MediaFiles from "@app/components/MediaFiles";
import { styles } from "./styles";
import type { MediaFilesArr } from "@app/lib/models/MediaFileModel";
import type { RIContentProps } from "./types";

const RIContent = (props: RIContentProps) => {
  const { title, description, material_availability, media_files } = props;

  const isDisplayTitle = Boolean(title);
  const isDisplayDescription = Boolean(description);
  const isDisplayMaterial = material_availability !== null;
  const ownerMediaFiles = media_files?.filter(
    (item) => item.owner_type === "Заказчик",
  );
  const isDisplayMedia =
    Array.isArray(ownerMediaFiles) && Boolean(ownerMediaFiles?.length);

  return (
    <View style={[styles.container, styles.shadow]}>
      {isDisplayTitle && (
        <Typography
          style={styles.title}
          fontFamily={Font.TITLE}
          fontSize={26}
          lineHeight={32}
          fontWeight="600">
          {title}
        </Typography>
      )}
      {isDisplayDescription && (
        <Typography
          style={styles.description}
          fontSize={15}
          lineHeight={20}
          fontWeight="400">
          {description}
        </Typography>
      )}
      {isDisplayMaterial && (
        <View style={styles.material}>
          <Typography
            style={styles.materialTitle}
            fontSize={15}
            lineHeight={20}
            fontWeight="600">
            Материал:
          </Typography>
          <Typography
            style={styles.materialValue}
            fontSize={15}
            lineHeight={20}
            fontWeight="400"
            color={material_availability ? Colors.MAIN : Colors.ERROR}>
            {material_availability ? "В наличии" : "Не в наличии"}
          </Typography>
        </View>
      )}
      {isDisplayMedia && (
        <View style={styles.media}>
          <MediaFiles media_files={ownerMediaFiles as MediaFilesArr} />
        </View>
      )}
    </View>
  );
};

export default React.memo(RIContent);
