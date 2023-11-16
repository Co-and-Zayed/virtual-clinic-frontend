import api from "Pharmacy/api";
import { refreshAccessTokenUrl } from "Pharmacy/api/apiUrls";
import store from "Pharmacy/redux/store";

export const refreshAccessTokenService = async () => {
  const response = await api.post(
    refreshAccessTokenUrl(),
    {
      username: store.getState()?.userReducer?.userData?.username,
      token: store.getState()?.userReducer?.refreshToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
