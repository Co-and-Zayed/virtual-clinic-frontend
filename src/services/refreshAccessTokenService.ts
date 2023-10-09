import api from "api";
import { refreshAccessTokenUrl } from "api/apiUrls";
import store from "Redux/store";

export const refreshAccessTokenService = async () => {
    const response = await api.post(
        refreshAccessTokenUrl(),
        {
            email : store.getState()?.loginReducer?.userData?.email,
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