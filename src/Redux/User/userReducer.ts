import {
  LOGIN_LOADING,
  LOGIN_USER,
  LOGOUT_USER,
  SHOULD_REFRESH,
  REFRESH_TIMEOUT,
  UPDATE_ACCESS_TOKEN,
} from "./loginTypes";
import store from "redux/store";

const initialState = {
  loginLoading: false,
  userType: null as string | null,
  userData: null as any,
  accessToken: null as any,
  refreshToken: null as any,
  refreshTimeout: null as any,
  shouldRefresh: "OFF",
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, loginLoading: action.payload };
    case UPDATE_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case LOGIN_USER:
      return {
        ...state,
        userType: action.payload?.type,
        userData: action.payload?.data,
        accessToken: action.payload?.tokens?.accessToken,
        refreshToken: action.payload?.tokens?.refreshToken,
      };
    case LOGOUT_USER:
      return { ...state, userType: null };
    case SHOULD_REFRESH:
      if (action.payload === "OFF" && state.refreshTimeout) {
        clearTimeout(state.refreshTimeout);
        console.log("Timeout cleared");
      }
      return {
        ...state,
        shouldRefresh: action.payload,
      };
    case REFRESH_TIMEOUT:
      return {
        ...state,
        refreshTimeout: action.payload,
      };
    default:
      return state;
  }
};


