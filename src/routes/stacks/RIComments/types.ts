import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel.ts";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";

export enum RICommentsSN {
  HOME = "Home",
  ADD_COMMENT = "AddComment",
}

export type RICHomeProps = {
  service: ServicesDetailModel;
  comments: CommentModel[];
  handleUpdateComments: (comments: CommentModel[]) => void;
};

export type RICAddCommentProps = {
  handleUpdateComments: (comments: CommentModel[]) => void;
};

export type RICommentsSPL = {
  [RICommentsSN.HOME]: RICHomeProps;
  [RICommentsSN.ADD_COMMENT]: RICAddCommentProps;
};

export type RICHomeScreenProps = NativeStackScreenProps<
  RICommentsSPL,
  RICommentsSN.HOME
>;

export type RICAddCommentScreenProps = NativeStackScreenProps<
  RICommentsSPL,
  RICommentsSN.ADD_COMMENT
>;
