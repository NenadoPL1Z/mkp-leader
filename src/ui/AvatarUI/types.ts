import type { AvatarProps } from "@rneui/themed";

export type AvatarSize = 104 | 88 | 40;

export interface AvatarUIProps {
  name: string;
  size?: AvatarSize;
  phone?: string;
  avatarProps?: Omit<AvatarProps, "source" | "">;
  isDefault?: boolean;
}
