import api from "api";
import { forgetPasswordUrl } from "api/apiUrls";

export const forgetPasswordService = async (data: any) => {
    const response = await api.post(
        forgetPasswordUrl(),
        data,
        {
            headers : {
                "Content-Type" : "application/json"
            }
        }
    );
    
    return response;
}