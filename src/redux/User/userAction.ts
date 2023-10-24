import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_USER,
  LOGOUT_USER,
  SHOULD_REFRESH,
} from "redux/User/loginTypes";
import { Dispatch } from "redux";
import { loginService } from "services/loginService";
import { logoutService } from "services/logoutService";

export const loginAction = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING, payload: true });
    const response = await loginService(data);

    dispatch({ type: LOGIN_USER, payload: response.data });
    dispatch({ type: SHOULD_REFRESH, payload: "START" });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err });
  } finally {
    dispatch({ type: LOGIN_LOADING, payload: false });
  }
};

export const logoutAction = () => async (dispatch: Dispatch) => {
  try {
    await logoutService();
    dispatch({ type: LOGOUT_USER });
    dispatch({ type: SHOULD_REFRESH, payload: "OFF" });
  } catch (err) {
    // dispatch({ type: LOGOUT_FAILURE, payload: err });
  }
};
