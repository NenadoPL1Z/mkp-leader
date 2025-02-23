import type { UserRole } from "@app/lib/models/UserModel.ts";

export interface CommentModel {
  id: number;
  service_id: string;
  user_id: number;
  user_role: UserRole | null;
  user_name: null | string;
  user_phone: null | string;
  comments: string;
  created_at: string;
}
