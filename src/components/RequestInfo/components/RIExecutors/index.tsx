import React from "react";
import { View } from "react-native";
import AboutCardExecutor from "@app/components/AboutCard/variant/AboutCardExecutor";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import CheckBoxUI from "@app/ui/CheckBoxUI";
import MediaFiles from "@app/components/MediaFiles";
import { Font } from "@app/theme/font.ts";
import {
  FIRST_EXECUTOR_NAME,
  SECOND_EXECUTOR_NAME,
} from "@app/lib/constants/executors.ts";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { styles } from "./styles";
import type { ReactNode } from "react";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";
import type { MediaFilesArr } from "@app/lib/models/MediaFileModel";

type Props = ServicesDetailModel & {
  isAvatar?: boolean;
  children?: ReactNode;
};

const RIExecutors = (props: Props) => {
  const {
    isAvatar = true,
    executor_default,
    executor_additional,
    deadline_at,
    custom_position,
    media_files,
    children,
  } = props;

  const executorMediaFiles = media_files?.filter(
    (item) => item.owner_type === "Исполнитель",
  );

  const isDisplayMedia =
    Array.isArray(executorMediaFiles) && Boolean(executorMediaFiles?.length);

  return (
    <View style={[styles.root, styles.shadow]}>
      <View style={styles.wrapper}>
        {isAvatar && (
          <View>
            <Typography
              style={styles.title}
              fontFamily={Font.TEXT}
              fontWeight="600"
              fontSize={15}
              lineHeight={15}>
              {FIRST_EXECUTOR_NAME}:
            </Typography>
            <AboutCardExecutor
              id={executor_default.id}
              name={executor_default.name}
              phone={executor_default.phone}
              username={executor_default.username}
              nativeProps={{
                containerStyle: styles.marginBottom,
                isShadow: false,
                isPadding: false,
              }}
            />
            {!!executor_additional && (
              <View style={styles.additional_executor}>
                <Typography
                  style={styles.title}
                  fontFamily={Font.TEXT}
                  fontWeight="600"
                  fontSize={15}
                  lineHeight={15}>
                  {SECOND_EXECUTOR_NAME}:
                </Typography>
                <AboutCardExecutor
                  id={executor_additional.id}
                  name={executor_additional.name}
                  phone={executor_additional.phone}
                  username={executor_additional.username}
                  nativeProps={{
                    containerStyle: styles.marginBottom,
                    isShadow: false,
                    isPadding: false,
                  }}
                />
              </View>
            )}
          </View>
        )}
        {!!deadline_at && (
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
              {deadline_at ? formatDateTime(deadline_at) : ""}
            </Typography>
          </View>
        )}
        {!!custom_position && (
          <View style={styles.comment}>
            <CheckBoxUI
              disabled={true}
              title="Заказная позиция"
              containerStyle={styles.check}
              checked={Boolean(custom_position)}
            />
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

export default React.memo(RIExecutors);
