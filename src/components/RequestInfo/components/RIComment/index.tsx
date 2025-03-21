import React from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import Typography from "@app/ui/Typography";
import BadgeUI from "@app/ui/BadgeUI";
import { ArrowDownIcon } from "@app/assets/icons/dist";
import SpinnerUI from "@app/ui/SpinnerUI";
import ButtonUI from "@app/ui/ButtonUI";
import { Colors } from "@app/theme/colors.ts";
import { IS_ANDROID } from "@app/lib/constants";
import { styles } from "./styles.ts";
import { useRIComment } from "./useRIComment.ts";
import type { RICommentProps } from "./types.ts";

const RIComment = (props: RICommentProps) => {
  const { onPushToComments } = props;
  const {
    opacityContent,
    opacityLoading,
    isLoading,
    hasError,
    comments,
    refresh,
    handleUpdateComments,
  } = useRIComment(props);

  const disabled = Boolean(isLoading || hasError);
  const isDisplayLoading = Boolean(isLoading && !comments?.length);
  const isDisplayError = Boolean(hasError && !comments?.length);
  const isDisplayContent = !isDisplayLoading && !isDisplayError;
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow]}
      disabled={disabled}
      onPress={() => onPushToComments(comments!, handleUpdateComments)}>
      <View style={styles.preview}>
        <Typography
          fontSize={16}
          lineHeight={32}
          fontWeight="600">
          Комментарии
        </Typography>
        {isDisplayContent && (
          <Animated.View style={{ opacity: opacityContent }}>
            <BadgeUI
              count={comments?.length ?? 0}
              isZero={true}
            />
          </Animated.View>
        )}
      </View>
      {isDisplayLoading && (
        <Animated.View style={{ opacity: opacityLoading }}>
          <SpinnerUI size={IS_ANDROID ? 24 : "small"} />
        </Animated.View>
      )}
      {isDisplayError && (
        <ButtonUI
          variant="text"
          titleStyle={{ color: Colors.ERROR }}
          buttonStyle={styles.buttonStyles}
          onPress={refresh}>
          Повторить попытку
        </ButtonUI>
      )}
      {isDisplayContent && (
        <Animated.View style={{ opacity: opacityContent }}>
          <ArrowDownIcon style={styles.arrowRight} />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(RIComment);
