import type { ServicesDetailModel } from "@app/lib/models/ServiceModel.ts";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";

export type CommentCardProps = {
  comment: CommentModel;
  service: ServicesDetailModel;
  count: number;
  isMyComment: boolean;
};
