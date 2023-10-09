import api from "api";
import { logoutUrl } from "api/apiUrls";
import store from "Redux/store";

export const logoutService = async () => {
    const response = await api.post(
        logoutUrl(),
        {
            email : store.getState()?.loginReducer?.userData?.email
        },
        {
            headers : {
                "Content-Type" : "application/json"
            }
        }
    );

    return response;
}