import {
  CREATED_ADMIN_DATA_LOADING,
  CREATED_ADMIN_DATA_SUCCESS,
  CREATED_ADMIN_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  createLoading: false,
  createdAdmin: null,
};

export const createAdminReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATED_ADMIN_DATA_LOADING:
      return { ...state, createLoading: action.payload };
    case CREATED_ADMIN_DATA_SUCCESS:
      return {
        ...state,
        createdAdmin: action.payload,
      };
    case CREATED_ADMIN_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
