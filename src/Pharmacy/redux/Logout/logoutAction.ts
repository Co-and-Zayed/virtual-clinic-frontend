import {
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "Pharmacy/redux/Logout/logoutTypes";

import { LOG_OUT } from "Pharmacy/redux/PharmacyRedux/types";

import { Dispatch } from "redux";

import { logoutService } from "Pharmacy/services/logoutService";

export const logoutAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOGOUT_LOADING, payload: true });
    const response = await logoutService();
    dispatch({ type: LOGOUT_SUCCESS, payload: true });
    dispatch({ type: LOG_OUT });
  } catch (err) {
    dispatch({ type: LOGOUT_SUCCESS, payload: false });
    dispatch({ type: LOGOUT_FAILURE, payload: err });
  } finally {
    dispatch({ type: LOGOUT_LOADING, payload: false });
  }
};
