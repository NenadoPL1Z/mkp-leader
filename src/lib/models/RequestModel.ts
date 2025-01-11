import type { CompanyModel } from "@app/lib/models/CompanyModel";

type Parent = Pick<CompanyModel, "id" | "name" | "address">;

export interface RequestBadgeModel {
  mark: boolean;
  counter: number;
}

export interface RequestTabsModel {
  working: number;
  verifying: number;
  closed: number;
  refusal: number;
}

export interface RequestCompanyModel extends Parent {
  badge: RequestBadgeModel;
  tabs: RequestTabsModel;
}
