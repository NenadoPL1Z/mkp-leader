import { Api } from "@app/lib/constants/api";
import { API_URL } from "@app/lib/constants";

export const getImageById = (id: string) => {
  return `${API_URL}${Api.media.getImage(id)}`;
};
