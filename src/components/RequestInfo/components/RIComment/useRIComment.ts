import { useEffect, useState } from "react";
import { getServiceCommentsById } from "@app/lib/api/services/getServiceCommentsById.ts";
import { useStatus } from "@app/hooks/useStatus.ts";
import { Response } from "@app/lib/constants/response.ts";
import { Animated, useAnimatedValue } from "react-native";
import { DURATION } from "./constants.ts";
import type { RICommentProps } from "./types.ts";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";

export const useRIComment = ({ serviceId, onShowToast }: RICommentProps) => {
  const opacityContent = useAnimatedValue(0);
  const opacityLoading = useAnimatedValue(1);
  const [comments, setComments] = useState<CommentModel[]>();

  const {
    isLoading,
    hasError,
    handleLoadingStatus,
    handleErrorStatus,
    handleClearStatus,
  } = useStatus();

  const handleUpdateComments = (updatedComments: CommentModel[]) => {
    setComments(updatedComments);
  };

  const refresh = async () => {
    try {
      handleLoadingStatus();
      const comments = await getServiceCommentsById(serviceId);
      handleUpdateComments(comments);
      Animated.timing(opacityLoading, {
        toValue: 0,
        duration: DURATION,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        handleClearStatus();
        Animated.timing(opacityContent, {
          toValue: 1,
          duration: DURATION,
          useNativeDriver: true,
        }).start();
      }, DURATION);
    } catch {
      handleErrorStatus(Response.UNKNOWN);
      onShowToast(Response.COMMENTS);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    opacityContent,
    opacityLoading,
    isLoading,
    hasError,
    comments,
    refresh,
    handleUpdateComments,
  };
};
