import type { CompanyModel } from "@app/lib/models/CompanyModel";

type Parent = Pick<CompanyModel, "id" | "name" | "address">;

export interface RequestBadgeModel {
  counter: number;
  counter_working: number;
  counter_verifying: number;
}

export interface RequestTabsModel {
  working: number;
  verifying: number;
  closed: number;
  refused: number;
}

export interface RequestCompanyModel extends Parent {
  badge: RequestBadgeModel;
  tabs: RequestTabsModel;
}
