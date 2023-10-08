import api from "api";
import { loginUrl } from "api/apiUrls";

export const loginService = async (data: any) => {
  const response = await api.post(loginUrl(), data);

  return response;
};
