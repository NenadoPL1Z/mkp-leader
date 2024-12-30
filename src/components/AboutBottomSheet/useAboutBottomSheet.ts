import { getWorkTime } from "@app/lib/functions/getWorkTime";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { AboutBottomSheetProps } from "@app/components/AboutBottomSheet/types";

export const useAboutBottomSheet = ({
  customer_company,
}: AboutBottomSheetProps) => {
  const { bottom } = useSafeAreaInsets();

  const time = getWorkTime(
    customer_company.opening_time,
    customer_company.closing_time,
  );
  const firstContacts = (customer_company.contacts || [])[0];
  const secondContacts = (customer_company.contacts || [])[1];

  const timeHeight =
    customer_company.opening_time !== null ||
    customer_company.closing_time !== null
      ? 106
      : 0;
  const contactsHeight =
    108 -
    (firstContacts?.phone || firstContacts?.person ? 0 : 42) -
    (secondContacts?.phone || secondContacts?.person ? 0 : 42);

  const height = 16 + 80 + timeHeight + contactsHeight + (bottom || 10);

  return {
    time,
    firstContacts,
    secondContacts,
    height,
  };
};
