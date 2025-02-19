import type { CommentModel } from "@app/lib/models/CommentModel.ts";

export type Comments = {
  comments: CommentModel[];
  handleUpdateComments: (comments: CommentModel[]) => void;
};
