import api from "VirtualClinic/api";
import { refreshAccessTokenUrl } from "VirtualClinic/api/apiUrls";
import store from "VirtualClinic/redux/store";

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
