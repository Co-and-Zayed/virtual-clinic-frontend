import {
  DELETED_ADMIN_DATA_LOADING,
  DELETED_ADMIN_DATA_SUCCESS,
  DELETED_ADMIN_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types";

const initialState = {
  deleteAdminLoading: false,
  deletedAdmin: null,
};

export const deleteAdminReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DELETED_ADMIN_DATA_LOADING:
      return { ...state, deleteAdminLoading: action.payload };
    case DELETED_ADMIN_DATA_SUCCESS:
      return {
        ...state,
        deletedAdmin: action.payload,
      };
    case DELETED_ADMIN_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
