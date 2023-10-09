import {
  LOGIN_LOADING,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_ACCESS_TOKEN,
} from "./loginTypes";

const initialState = {
  loginLoading: false,
  userType: null as string | null,
  userData: null as any,
  accessToken: null as any,
  refreshToken: null as any,
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
    default:
      return state;
  }
};
