import api from "VirtualClinic/api";
import { forgetPasswordUrl } from "VirtualClinic/api/apiUrls";

export const forgetPasswordService = async (data: any) => {
  const response = await api.post(forgetPasswordUrl(), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
