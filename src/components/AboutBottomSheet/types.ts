import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";
import type { BottomSheetUIProps } from "@app/ui/BottomSheetUI/types";

export type AboutBottomSheetProps = CustomerDetailModel & {
  bottomSheet: Omit<BottomSheetUIProps, "children">;
};
