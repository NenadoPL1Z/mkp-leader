import { useEffect, useRef, useState } from "react";
import { Count } from "@app/lib/constants/count.ts";
import { Timing } from "@app/lib/constants/timing.ts";
import { useToastLocal } from "@app/hooks/useToastLocal.ts";
import { useStatus } from "@app/hooks/useStatus.ts";
import { Response } from "@app/lib/constants/response.ts";
import { postServiceComment } from "@app/lib/api/services/postServiceComment.ts";
import type { TextFieldRef } from "@app/types/general.ts";
import type { RICAddCommentScreenProps } from "../../../types.ts";

export const useRICAddComment = ({
  route,
  navigation,
}: RICAddCommentScreenProps) => {
  const { serviceId, refreshComments } = route.params;
  const inputRef = useRef<TextFieldRef>(null);

  const [comment, setComment] = useState("");
  const isMax = comment.length > Count.DESCRIPTION;
  const isInvalid = !comment.trim().length || isMax;

  const {
    isLoading,
    hasError,
    handleLoadingStatus,
    handleErrorStatus,
    handleClearStatus,
  } = useStatus({ isLoading: false });
  const { toast, onShowToast, onHideToast } = useToastLocal();

  const publishComment = async () => {
    try {
      handleLoadingStatus();
      await postServiceComment(serviceId, comment.trim());
      refreshComments(false, () => {
        handleClearStatus();
        navigation.goBack();
      });
    } catch {
      handleErrorStatus(Response.UNKNOWN);
      onShowToast({ text1: Response.UNKNOWN });
    }
  };

  const handleSubmit = () => {
    if (isInvalid) {
      onShowToast({
        text1: isMax
          ? `Максимальное количество символов ${Count.DESCRIPTION}`
          : "Комментарий не может быть пустым",
      });
      return;
    }
    publishComment();
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, Timing.KEYBOARD_OPEN);
  }, []);

  return {
    inputRef,
    comment,
    isLoading,
    hasError,
    toast,
    isMax,
    setComment,
    onHideToast,
    handleSubmit,
  };
};
