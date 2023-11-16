import api from "VirtualClinic/api";
import { verifyOtpUrl } from "VirtualClinic/api/apiUrls";

export const verifyOtpService = async (data: any) => {
  const response = await api.post(verifyOtpUrl(), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
