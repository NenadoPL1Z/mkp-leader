import React from "react";
import { View } from "react-native";
import AboutCardExecutor from "@app/components/AboutCard/variant/AboutCardExecutor";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import CheckBoxUI from "@app/ui/CheckBoxUI";
import MediaFiles from "@app/components/MediaFiles";
import { styles } from "./styles";
import type { ReactNode } from "react";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";
import type { MediaFilesArr } from "@app/lib/models/MediaFileModel";

type Props = ServicesDetailModel & {
  isAvatar?: boolean;
  children?: ReactNode;
};

const RIExecutor = (props: Props) => {
  const {
    isAvatar = true,
    executor,
    deadline_at,
    custom_position,
    media_files,
    comment,
    children,
  } = props;

  if (!executor) {
    return null;
  }

  const executorMediaFiles = media_files?.filter(
    (item) => item.owner_type === "Исполнитель",
  );
  const isDisplayMedia =
    Array.isArray(executorMediaFiles) && Boolean(executorMediaFiles?.length);

  return (
    <View style={[styles.root, styles.shadow]}>
      <View style={styles.wrapper}>
        {isAvatar && (
          <AboutCardExecutor
            id={executor.id}
            name={executor.name}
            phone={executor.phone}
            username={executor.username}
            onPress={() => undefined}
            nativeProps={{
              isShadow: false,
              isTouch: false,
              isPadding: false,
            }}
          />
        )}
        <View style={styles.deadline}>
          <Typography
            fontSize={15}
            lineHeight={20}
            fontWeight="600">
            Срок исполнения:{" "}
          </Typography>
          <Typography
            fontSize={15}
            lineHeight={20}
            fontWeight="400"
            color={Colors.GREEN}>
            {deadline_at ? new Date(deadline_at).toLocaleDateString() : ""}
          </Typography>
        </View>
        {custom_position && (
          <View style={styles.comment}>
            <CheckBoxUI
              disabled={true}
              title="Заказная позиция"
              containerStyle={styles.check}
              checked={Boolean(custom_position)}
            />
          </View>
        )}
        {comment && (
          <View style={styles.comment}>
            <Typography
              fontSize={15}
              lineHeight={20}
              fontWeight="400">
              {comment}
            </Typography>
          </View>
        )}
        {isDisplayMedia && (
          <View style={styles.media}>
            <MediaFiles media_files={executorMediaFiles as MediaFilesArr} />
          </View>
        )}
        {children}
      </View>
    </View>
  );
};

export default React.memo(RIExecutor);
