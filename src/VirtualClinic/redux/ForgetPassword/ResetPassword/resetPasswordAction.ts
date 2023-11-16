import {
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "VirtualClinic/redux/ForgetPassword/ResetPassword/resetPasswordTypes";

import { Dispatch } from "redux";

import { resetPasswordService } from "VirtualClinic/services/ForgetPasswordServices/resetPasswordService";

export const resetPasswordAction =
  (type: any, data: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_LOADING, payload: true });
      const response = await resetPasswordService(type, data);
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_FAILURE, payload: err });
    } finally {
      dispatch({ type: RESET_PASSWORD_LOADING, payload: false });
    }
  };
