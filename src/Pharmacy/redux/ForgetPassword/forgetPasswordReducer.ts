import {
  FORGET_PASSWORD_LOADING,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE,
} from "Pharmacy/redux/ForgetPassword/forgetPasswordTypes";

const initialState = {
  forgetPasswordLoading: false,
  forgetPasswordSuccess: null,
  errors: null,
};

export const forgetPasswordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FORGET_PASSWORD_LOADING:
      return { ...state, forgetPasswordLoading: action.payload };
    case FORGET_PASSWORD_SUCCESS:
      return { ...state, forgetPasswordSuccess: action.payload.success };
    case FORGET_PASSWORD_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
