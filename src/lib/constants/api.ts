import type { ServiceId } from "@app/lib/models/ServiceModel.ts";
import type {
  CompanyContactsId,
  CompanyId,
} from "@app/lib/models/CompanyModel";
import type { UserId } from "@app/lib/models/UserModel";

type StateService = "new" | "working" | "verifying" | "closed" | "refused";

export const Api = {
  auth: {
    tokens: "/auth/tokens",
  },
  users: {
    block: (id: UserId) => `/users/block/${id}`,
    blockMe: "/users/me/block",
    company: (id: CompanyId) => `/users/company/${id}`,
    contactsCreate: (id: CompanyId) => `/users/contacts/create/${id}`,
    contactsEdit: (id: CompanyContactsId) => `/users/contacts/edit/${id}`,
    credentials: (id: UserId) => `/users/credentials/${id}`,
    personalData: (id: UserId) => `/users/personal_data/${id}`,
    executor: {
      all: "/users/executors/all",
      create: `/users/executors/create`,
      id: (id: UserId) => `/users/executor/${id}`,
      executorDefault: "/users/executor_default",
      selectExecutorDefault: "/users/executor/default",
    },
    customer: {
      all: "/users/customers/all",
      create: `/users/customers/create`,
      id: (id: UserId) => `/users/customer/${id}`,
    },
  },
  service: {
    create: "/services/create",
    edit: (id: string) => `/services/edit/${id}`,
    assign: "/services/assign",
    verify: "/services/verify",
    close: (id: ServiceId) => `/services/close/${id}`,
    companies: "/services/companies/all",
    id: (id: ServiceId) => `/services/get/${id}`,
    getStatusService: (state: StateService, id: string | number) =>
      `services/status/${state}/${id}`,
    getCustomerStatusService: (state: StateService) =>
      `services/customer/status/${state}`,
  },
  media: {
    getImage: (id: string) => `/media/image/${id}`,
    getVideo: (id: string) => `/media/video/${id}`,
  },
  docs: {
    policy: "/policy",
    userAccept: "/user_accept",
  },
};
