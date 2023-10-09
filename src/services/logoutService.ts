import api from "api";
import { logoutUrl } from "api/apiUrls";
import store from "redux/store";

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
