import type { CommentModel } from "@app/lib/models/CommentModel.ts";
import type { ServiceId } from "@app/lib/models/ServiceModel.ts";

export type RICommentProps = {
  serviceId: ServiceId;
  onShowToast: (text: string) => void;
  onPushToComments: (
    comments: CommentModel[],
    handleUpdateComments: (comments: CommentModel[]) => void,
  ) => void;
};
