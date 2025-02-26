import type { AvatarProps } from "@rneui/themed";

export type AvatarSize = 104 | 88 | 40;

export interface AvatarUIProps {
  name: string | null;
  size?: AvatarSize;
  phone?: string | null;
  avatarProps?: Omit<AvatarProps, "source" | "">;
  isDefault?: boolean;
}
