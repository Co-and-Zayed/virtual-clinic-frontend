import api from "Pharmacy/api";
import { loginUrl } from "Pharmacy/api/apiUrls";

export const loginService = async (data: any) => {
  const response = await api.post(loginUrl(), data);

  return response;
};
