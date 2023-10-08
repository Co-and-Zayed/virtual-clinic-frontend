import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "redux/Login/loginTypes";

import { Dispatch } from "redux";

import { loginService } from "services/loginService";

export const loginAction = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING, payload: true });
    const response = await loginService(data);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err });
  } finally {
    dispatch({ type: LOGIN_LOADING, payload: false });
  }
};
