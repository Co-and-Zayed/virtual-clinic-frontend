import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "Pharmacy/redux/Register/registerTypes";

const initialState = {
  registerLoading: false,
  registerSuccess: null,
  errors: null,
};

export const registerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REGISTER_LOADING:
      return { ...state, registerLoading: action.payload };
    case REGISTER_SUCCESS:
      return { ...state, registerSuccess: action.payload.success };
    case REGISTER_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
