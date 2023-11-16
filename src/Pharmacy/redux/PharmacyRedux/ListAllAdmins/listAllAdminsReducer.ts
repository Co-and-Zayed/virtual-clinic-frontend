import {
  ALL_ADMINS_DATA_LOADING,
  ALL_ADMINS_DATA_SUCCESS,
  ALL_ADMINS_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types";

const initialState = {
  adminsLoading: false,
  allAdmins: null,
};

export const listAllAdminsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ALL_ADMINS_DATA_LOADING:
      return { ...state, adminsLoading: action.payload };
    case ALL_ADMINS_DATA_SUCCESS:
      return {
        ...state,
        allAdmins: action.payload,
      };
    case ALL_ADMINS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
