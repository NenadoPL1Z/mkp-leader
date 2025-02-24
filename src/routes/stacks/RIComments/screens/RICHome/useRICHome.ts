import { useToastLocal } from "@app/hooks/useToastLocal.ts";
import { RICommentsSN } from "@app/routes/stacks/RIComments/types.ts";
import { useEffect, useRef, useState } from "react";
import { getServiceCommentsById } from "@app/lib/api/services/getServiceCommentsById.ts";
import { Response } from "@app/lib/constants/response.ts";
import { useStatus } from "@app/hooks/useStatus.ts";
import { useAppState } from "@app/hooks/useAppState.ts";
import { useToggle } from "@app/hooks/useToggle.ts";
import type { RICHomeScreenProps } from "@app/routes/stacks/RIComments/types.ts";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";

export const useRICHome = ({ route, navigation }: RICHomeScreenProps) => {
  const { service, initialComments, handleUpdateInitialComments } =
    route.params;

  const commentUpdateCount = useRef(0);

  const { isActive } = useAppState();
  const [comments, setComments] = useState<CommentModel[]>(initialComments);

  const {
    isLoading,
    handleLoadingStatus,
    handleErrorStatus,
    handleClearStatus,
  } = useStatus();

  const {
    isToggle: isOpen,
    handleToggleTrue: handleOpen,
    handleToggleFalse: handleClose,
  } = useToggle();

  const { toast, onHideToast, onShowToast } = useToastLocal();

  const handleUpdateComments = (comments: CommentModel[]) => {
    handleUpdateInitialComments(comments);
    setComments(comments);
  };

  const refresh = async (isUpdate: boolean, callback?: () => void) => {
    try {
      handleLoadingStatus();
      const response = await getServiceCommentsById(service.id);
      const newCommentsLength = comments.length - response.length;
      handleUpdateComments(response);
      handleClose();
      handleClearStatus();
      if (isUpdate && commentUpdateCount.current > 0) {
        onShowToast({
          text1: `Комментарии успешно обновлены! Новых комментариев: ${newCommentsLength}`,
        });
      }
    } catch {
      handleErrorStatus(Response.UNKNOWN);
      onShowToast({ text1: Response.COMMENTS });
    } finally {
      callback?.();
      commentUpdateCount.current += 1;
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
    refresh(Boolean(comments.length));
  }, [isActive]);

  return {
    commentUpdateCount,
    isLoading,
    isOpen,
    toast,
    comments,
    onHideToast,
    handleOpen,
    handleClose,
    handlePushAddComment,
    refresh,
  };
};
