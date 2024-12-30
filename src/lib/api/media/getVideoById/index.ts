import { Api } from "@app/lib/constants/api";
import { API_URL } from "@app/lib/constants";

//? FIX_COMMIT

export const getVideoById = (id: string) => {
  return `${API_URL}${Api.media.getVideo(id)}`;
};
