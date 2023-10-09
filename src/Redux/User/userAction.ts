import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_USER,
  LOGOUT_USER,
} from "redux/User/loginTypes";
import { Dispatch } from "redux";
import { loginService } from "services/loginService";
import { logoutService } from "services/logoutService";

export const loginAction = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING, payload: true });
    const response = await loginService(data);
    console.log("LOGIN RESPONSE: ", response);
    dispatch({ type: LOGIN_USER, payload: response.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err });
  } finally {
    dispatch({ type: LOGIN_LOADING, payload: false });
  }
};

export const logoutAction = () => async (dispatch: Dispatch) => {
  try {
    const response = await logoutService();
    dispatch({ type: LOGOUT_USER });
  } catch (err) {
    // dispatch({ type: LOGOUT_FAILURE, payload: err });
    console.log("LOGOUT ERROR: ", err);
  }
};
