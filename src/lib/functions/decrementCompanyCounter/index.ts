import { TopBarNames } from "@app/types/enums/TopBarNames";
import type {
  RequestTabsModel,
  RequestCompanyModel,
} from "@app/lib/models/RequestModel";
import type { PaginationSetCardRef } from "@app/components/PaginationList/types";

const getSumTabs = (tabs: RequestTabsModel) =>
  Object.values(tabs || {})?.reduce((prev, current) => prev + current, 0);

export const decrementCompanyCounter = (
  item: RequestCompanyModel,
  setCardRef: PaginationSetCardRef<RequestCompanyModel>,
  main = TopBarNames.WORK,
) => {
  return (tabName: TopBarNames) => {
    if (setCardRef) {
      setCardRef((prevState) => {
        const results: RequestCompanyModel[] = [];

        for (let i = 0; i < prevState.length; i++) {
          const current = prevState[i];

          //? SKIP
          if (current.id !== item.id) {
            results.push(current);
            continue;
          }

          //? MAIN LOGIC
          let counter = current.badge.counter;
          let mark = current.badge.mark;
          const tabs = { ...current.tabs };

          //? ONLY NEW
          if (tabName === main && counter > 0) {
            counter -= 1;
          }

          if (tabs[tabName] > 0) {
            tabs[tabName] -= 1;
          }

          if (getSumTabs(tabs) === 0 && mark) {
            mark = false;
          }

          results.push({ ...current, badge: { counter, mark }, tabs });
        }

        return results;
      });
    }
  };
};

export const updateCompanyCounter = (
  item: RequestCompanyModel,
  setCardRef: PaginationSetCardRef<RequestCompanyModel>,
  main = TopBarNames.WORK,
) => {
  return (tabName: TopBarNames, newCounter: number) => {
    if (setCardRef) {
      setCardRef((prevState) => {
        const results: RequestCompanyModel[] = [];

        for (let i = 0; i < prevState.length; i++) {
          const current = prevState[i];

          //? SKIP
          if (current.id !== item.id) {
            results.push(current);
            continue;
          }

          //? MAIN LOGIC
          let counter = current.badge.counter;
          let mark = current.badge.mark;
          const tabs = { ...current.tabs };

          //? ONLY NEW
          if (tabName === main) {
            counter = newCounter;
          }

          if (tabs[tabName]) {
            tabs[tabName] = newCounter;
          }

          if (getSumTabs(tabs) === 0 && mark) {
            mark = false;
          }

          results.push({ ...current, badge: { counter, mark }, tabs });
        }

        return results;
      });
    }
  };
};
