import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { Colors } from "@app/theme/colors";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";
import type { HeaderRightProps } from "@app/ui/HeaderUI/types";

export const getRequestHeaderRight = (
  isActive: boolean,
  data: ServicesDetailModel,
): HeaderRightProps => {
  const isEdit = data?.executor?.id;
  const onPress = () => {
    //
  };

  return {
    subtitle: formatDateTime(data.created_at),
    variant: isEdit ? "edit" : "text",
    activeOpacity: isEdit ? undefined : 1,
    onPress: isEdit ? onPress : undefined,
    iconProps: { color: isActive ? Colors.MAIN : Colors.GRAY_TEN },
  };
};
