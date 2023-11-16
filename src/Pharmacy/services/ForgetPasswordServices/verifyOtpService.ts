import api from "Pharmacy/api";
import { verifyOtpUrl } from "Pharmacy/api/apiUrls";

export const verifyOtpService = async (data: any) => {
  const response = await api.post(verifyOtpUrl(), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
