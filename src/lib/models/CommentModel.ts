import type { UserModel } from "@app/lib/models/UserModel.ts";

export interface CommentModel {
  id: number;
  service_id: string;
  user_id: number;
  user: UserModel;
  comments: string;
  created_at: string;
}
