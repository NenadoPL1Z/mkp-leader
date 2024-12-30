import type { UseRole } from "@app/lib/models/UserModel";
import type { PaginationSetCardRef } from "@app/components/PaginationList/types";
import type {
  ServicesDetailModel,
  ServiceCardModel,
} from "@app/lib/models/ServiceModel";
import type { ReactNode } from "react";

export type RInfoChildrenOnUpdate = (
  data: Partial<ServicesDetailModel>,
) => void;

export type RInfoChildrenProps = {
  data: ServicesDetailModel;
  onUpdateData: RInfoChildrenOnUpdate;
};

export type RequestInfoProps = {
  role: UseRole;
  card: ServiceCardModel;
  setCardRef: PaginationSetCardRef<ServiceCardModel>;
  onDecrementCounter: () => void;
  children: (props: RInfoChildrenProps) => ReactNode;
};
