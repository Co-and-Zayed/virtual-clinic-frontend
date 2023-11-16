import api from "VirtualClinic/api";
import { resetPasswordUrl } from "VirtualClinic/api/apiUrls";

export const resetPasswordService = async (type: any, data: any) => {
  const response = await api.post(resetPasswordUrl(type), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
