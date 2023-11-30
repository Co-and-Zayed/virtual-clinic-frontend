import api from "Pharmacy/api";
import { logoutUrl } from "Pharmacy/api/apiUrls";
import store from "VirtualClinic/redux/store";

export const logoutService = async () => {
  const response = await api.post(
    logoutUrl(),
    {
      username: store.getState()?.userReducer?.userData?.username,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
