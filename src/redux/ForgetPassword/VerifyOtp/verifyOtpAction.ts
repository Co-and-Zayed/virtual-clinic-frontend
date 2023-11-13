import
{
    VERIFY_OTP_LOADING,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE
}
from "redux/ForgetPassword/VerifyOtp/verifyOtpTypes";

import 
{
    LOGIN_USER
}
from "redux/User/loginTypes";

import { Dispatch } from "redux";

import { verifyOtpService } from "services/ForgetPasswordServices/verifyOtpService";

export const verifyOtpAction = (data: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: VERIFY_OTP_LOADING, payload: true});
        const response = await verifyOtpService(data);
        dispatch({type: LOGIN_USER, payload: response.data});
        dispatch({type: VERIFY_OTP_SUCCESS, payload: response.data});
    } catch (err) {
        dispatch({type: VERIFY_OTP_FAILURE, payload: err});
    } finally {
        dispatch({type: VERIFY_OTP_LOADING, payload: false});
    }
}