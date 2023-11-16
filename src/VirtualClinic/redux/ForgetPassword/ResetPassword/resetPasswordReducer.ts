import {
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "VirtualClinic/redux/ForgetPassword/ResetPassword/resetPasswordTypes";

const initialState = {
  resetPasswordLoading: false,
  resetPasswordSuccess: null,
  errors: null,
};

export const resetPasswordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RESET_PASSWORD_LOADING:
      return { ...state, resetPasswordLoading: action.payload };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordSuccess: action.payload.success };
    case RESET_PASSWORD_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
