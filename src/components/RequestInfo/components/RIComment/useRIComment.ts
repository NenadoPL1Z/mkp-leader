import { useEffect, useState } from "react";
import { getServiceCommentsById } from "@app/lib/api/services/getServiceCommentsById.ts";
import { useStatus } from "@app/hooks/useStatus.ts";
import { Response } from "@app/lib/constants/response.ts";
import type { RICommentProps } from "./types.ts";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";

export const useRIComment = ({ serviceId, onShowToast }: RICommentProps) => {
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

  const loadData = async () => {
    try {
      handleLoadingStatus();
      const comments = await getServiceCommentsById(serviceId);
      handleUpdateComments(comments);
      handleClearStatus();
    } catch {
      handleErrorStatus(Response.UNKNOWN);
      onShowToast(
        "Ошибка при попытке получения комментариев! Попробуйте еще раз или повторите позже.",
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    isLoading,
    hasError,
    comments,
    loadData,
    handleUpdateComments,
  };
};
