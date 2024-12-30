import type { OnPress, Variant } from "@app/components/Card";

export interface AdminCardProps {
  variant?: Variant;
  title: string;
  creationTime?: string;
  executionTime?: string;
  address?: string;
  isBadge?: boolean;
  badgeCount?: number;
  deadline_at?: string;
  onPress: OnPress;
}