import { useToastLocal } from "@app/hooks/useToastLocal.ts";
import { RICommentsSN } from "@app/routes/stacks/RIComments/types.ts";
import { useEffect, useState } from "react";
import { getServiceCommentsById } from "@app/lib/api/services/getServiceCommentsById.ts";
import { Response } from "@app/lib/constants/response.ts";
import { useStatus } from "@app/hooks/useStatus.ts";
import { useAppState } from "@app/hooks/useAppState.ts";
import type { RICHomeScreenProps } from "@app/routes/stacks/RIComments/types.ts";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";

export const useRICHome = ({ route, navigation }: RICHomeScreenProps) => {
  const { service, initialComments, handleUpdateInitialComments } =
    route.params;
  const { isActive } = useAppState();

  const [comments, setComments] = useState<CommentModel[]>(initialComments);
  const {
    hasError,
    handleLoadingStatus,
    handleErrorStatus,
    handleClearStatus,
  } = useStatus();
  const { toast, onHideToast, onShowToast } = useToastLocal();

  const handleUpdateComments = (comments: CommentModel[]) => {
    handleUpdateInitialComments(comments);
    setComments(comments);
  };

  const refresh = async (callback?: () => void) => {
    try {
      handleLoadingStatus();
      const comments = await getServiceCommentsById(service.id);
      handleUpdateComments(comments);
      handleClearStatus();
    } catch {
      handleErrorStatus(Response.UNKNOWN);
      onShowToast({ text1: Response.COMMENTS });
    } finally {
      callback?.();
    }
  };

  const handlePushAddComment = () => {
    navigation.navigate(RICommentsSN.ADD_COMMENT, {
      serviceId: service.id,
      refreshComments: refresh,
    });
  };

  useEffect(() => {
    if (!isActive) return;
    refresh();
  }, [isActive]);

  return {
    toast,
    comments,
    hasError,
    onHideToast,
    onShowToast,
    handlePushAddComment,
  };
};
