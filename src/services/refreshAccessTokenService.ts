import api from "api";
import { refreshAccessTokenUrl } from "api/apiUrls";
import store from "redux/store";

export const refreshAccessTokenService = async () => {
    const response = await api.post(
        refreshAccessTokenUrl(),
        {
            username : store.getState()?.loginReducer?.userData?.username,
            token : store.getState()?.loginReducer?.refreshToken
        },
        {
            headers : {
                "Content-Type" : "application/json"
            }
        }
    );

    return response;
}