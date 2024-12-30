import { DADATA_BASE_URL } from "@env";
import axios from "axios";

import { headersDadata } from "../index";

import type { SuccessResponse } from "./types";

export const url = `${DADATA_BASE_URL}/4_1/rs/suggest/address`;

export const fetchPostSuggestionsAddress = async (address: string) => {
  return await axios.post<SuccessResponse>(
    url,
    {
      query: address,
      count: 10,
      from_bound: { value: "country" },
      to_bound: { value: "house" },
    },
    { headers: headersDadata },
  );
};
