import type {
  RequestBadgeModel,
  RequestBadgeModelKey,
  RequestCompanyModel,
} from "@app/lib/models/RequestModel";
import type { TopBarNames } from "@app/types/enums/TopBarNames";
import type { PaginationSetCardRef } from "@app/components/PaginationList/types";

export const decrementUnreadCounter = (
  updatedCompany: RequestCompanyModel,
  setCardRef: PaginationSetCardRef<RequestCompanyModel>,
) => {
  return (tabName: TopBarNames) => {
    setCardRef?.((companies) => {
      return companies.reduce<RequestCompanyModel[]>((acc, company) => {
        if (company.id !== updatedCompany.id) {
          acc.push(company);
          return acc;
        }
        const tabs = company.tabs;
        // decrement
        if (tabs[tabName] > 0) tabs[tabName] -= 1;
        acc.push({ ...company, tabs });
        return acc;
      }, []);
    });
  };
};

export const setUnreadCounter = (
  updatedCompany: RequestCompanyModel,
  setCardRef: PaginationSetCardRef<RequestCompanyModel>,
) => {
  return (tabName: TopBarNames, newCounter: number) => {
    setCardRef?.((companies) => {
      return companies.reduce<RequestCompanyModel[]>((acc, company) => {
        if (company.id !== updatedCompany.id) {
          acc.push(company);
          return acc;
        }
        const tabs = company.tabs;
        // update
        tabs[tabName] = newCounter;
        acc.push({ ...company, tabs });
        return acc;
      }, []);
    });
  };
};

export const updateStatusCounter = (
  updatedCompany: RequestCompanyModel,
  setCardRef: PaginationSetCardRef<RequestCompanyModel>,
) => {
  return (
    currentTabName: RequestBadgeModelKey,
    nextTabName: RequestBadgeModelKey,
  ) => {
    setCardRef?.((companies) => {
      return companies.reduce<RequestCompanyModel[]>((acc, company) => {
        if (company.id !== updatedCompany.id) {
          acc.push(company);
          return acc;
        }
        const badge = company.badge;
        if (currentTabName in badge) badge[currentTabName] -= 1;
        if (nextTabName in badge) badge[nextTabName] += 1;
        acc.push({ ...company, badge });
        return acc;
      }, []);
    });
  };
};

export const setStatusCounter = (
  updatedCompany: RequestCompanyModel,
  setCardRef: PaginationSetCardRef<RequestCompanyModel>,
) => {
  return (updatedBadge: Record<keyof RequestBadgeModel, number>) => {
    setCardRef?.((companies) => {
      return companies.reduce<RequestCompanyModel[]>((acc, company) => {
        if (company.id !== updatedCompany.id) {
          acc.push(company);
          return acc;
        }
        acc.push({ ...company, badge: { ...company.badge, ...updatedBadge } });
        return acc;
      }, []);
    });
  };
};
