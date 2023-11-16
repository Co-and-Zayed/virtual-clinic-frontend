import api from "Pharmacy/api";
import { resetPasswordUrl } from "Pharmacy/api/apiUrls";

export const resetPasswordService = async (type: any, data: any) => {
  const response = await api.post(resetPasswordUrl(type), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
