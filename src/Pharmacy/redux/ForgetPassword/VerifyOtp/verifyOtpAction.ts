import {
  VERIFY_OTP_LOADING,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
} from "Pharmacy/redux/ForgetPassword/VerifyOtp/verifyOtpTypes";

import { LOGIN_USER } from "Pharmacy/redux/User/loginTypes";

import { Dispatch } from "redux";

import { verifyOtpService } from "Pharmacy/services/ForgetPasswordServices/verifyOtpService";

export const verifyOtpAction = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: VERIFY_OTP_LOADING, payload: true });
    const response = await verifyOtpService(data);
    dispatch({ type: LOGIN_USER, payload: response.data });
    dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: VERIFY_OTP_FAILURE, payload: err });
  } finally {
    dispatch({ type: VERIFY_OTP_LOADING, payload: false });
  }
};
