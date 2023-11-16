import api from "VirtualClinic/api";
import { loginUrl } from "VirtualClinic/api/apiUrls";

export const loginService = async (data: any) => {
  const response = await api.post(loginUrl(), data);

  return response;
};
