import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "Pharmacy/redux/Register/registerTypes";

import { LOGIN_USER, SHOULD_REFRESH } from "Pharmacy/redux/User/loginTypes";

import { Dispatch } from "redux";

import { registerService } from "Pharmacy/services/registerService";
import { LOGIN_SUCCESS } from "Pharmacy/redux/User/loginTypes";

export const regsiterAction = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: REGISTER_LOADING, payload: true });
    const response = await registerService(data);

    dispatch({ type: LOGIN_USER, payload: response.data });
    dispatch({ type: SHOULD_REFRESH, payload: "START" });
  } catch (err) {
    dispatch({ type: REGISTER_FAILURE, payload: false });
  } finally {
    dispatch({ type: REGISTER_LOADING, payload: false });
  }
};
