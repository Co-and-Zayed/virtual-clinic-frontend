import api from "VirtualClinic/api";
import { logoutUrl } from "VirtualClinic/api/apiUrls";
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
