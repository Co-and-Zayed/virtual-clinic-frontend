import api from "api";
import { registerUrl } from "api/apiUrls";

export const registerService = async (data: any) => {
  const response = await api.post(registerUrl(), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
