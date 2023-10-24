import { all } from "axios";
import {
  LOGIN_LOADING,
  LOGIN_USER,
  LOGOUT_USER,
  SHOULD_REFRESH,
  REFRESH_TIMEOUT,
  UPDATE_ACCESS_TOKEN,
  ADD_TIMEOUT,
  CLEAR_TIMEOUTS,
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
  allTimeouts: [] as any,
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
    case ADD_TIMEOUT:
      return {
        ...state,
        allTimeouts: [...state.allTimeouts, action.payload],
      };
    case CLEAR_TIMEOUTS:
      console.log("clearing timeouts", state.allTimeouts);
      if (state.allTimeouts) {
        for (let i = 0; i < state.allTimeouts.length; i++) {
          clearTimeout(state.allTimeouts[i]);
        }
      }
      return {
        ...state,
        allTimeouts: [] as any,
      };

    default:
      return state;
  }
};
