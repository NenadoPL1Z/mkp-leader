import type { CommentModel } from "@app/lib/models/CommentModel.ts";

export type CommentCardProps = CommentModel & {
  isMy: boolean;
};
