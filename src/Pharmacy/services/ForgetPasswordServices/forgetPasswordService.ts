import api from "Pharmacy/api";
import { forgetPasswordUrl } from "Pharmacy/api/apiUrls";

export const forgetPasswordService = async (data: any) => {
  const response = await api.post(forgetPasswordUrl(), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
