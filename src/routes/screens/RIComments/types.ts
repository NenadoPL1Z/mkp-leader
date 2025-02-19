import type { ServicesDetailModel } from "@app/lib/models/ServiceModel.ts";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type Comments = {
  service: ServicesDetailModel;
  comments: CommentModel[];
  handleUpdateComments: (comments: CommentModel[]) => void;
};

export type RICommentsProps = NativeStackScreenProps<
  { Comments: Comments },
  "Comments"
>;
