import api from "api";
import { verifyOtpUrl } from "api/apiUrls";

export const verifyOtpService = async (data: any) => {
    const response = await api.post(
        verifyOtpUrl(),
        data,
        {
            headers: {
                "Content-Type" : "application/json"
            }
        }
    );

    return response;
}