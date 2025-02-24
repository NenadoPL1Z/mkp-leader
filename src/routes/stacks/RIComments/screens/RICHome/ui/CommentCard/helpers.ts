import { formatPhoneNumber } from "@app/lib/functions/formatPhoneNumber";
import { UserRoles } from "@app/lib/models/UserModel.ts";
import {
  FIRST_EXECUTOR_NAME,
  OLD_EXECUTOR,
  SECOND_EXECUTOR_NAME,
} from "@app/lib/constants/executors.ts";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel.ts";
import type { CommentCardProps } from "./types.ts";

const getName = (comment: CommentModel, service?: ServicesDetailModel) => {
  const { user_role, user_name, user_id } = comment;
  if (!user_role) return "Пользователь";

  if (user_role !== "executor" || !service) {
    return `${UserRoles[user_role]}`;
  }

  const { executor_default_id, executor_additional_id } = service;
  if (executor_default_id === user_id) {
    return `${user_name} / ${FIRST_EXECUTOR_NAME}`;
  } else if (executor_additional_id === user_id) {
    return `${user_name} / ${SECOND_EXECUTOR_NAME}`;
  } else {
    return `${user_name} / ${OLD_EXECUTOR}`;
  }
};

export const getCommentAuthor = ({
  service,
  comment,
  isMyComment,
}: CommentCardProps) => {
  const { user_role, user_name, user_phone } = comment;

  const name = getName(comment, service);
  let subtitle = "-";
  const avatarName = user_name;

  if (user_role === "executor") {
    subtitle = user_phone ? formatPhoneNumber(user_phone) : "-";
  }

  if (isMyComment) subtitle = "Ваш комментарий";

  return {
    name,
    subtitle,
    avatarName,
  };
};
