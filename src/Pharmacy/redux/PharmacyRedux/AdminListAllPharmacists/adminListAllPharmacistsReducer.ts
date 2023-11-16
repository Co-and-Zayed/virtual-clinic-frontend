import {
  ADMIN_PHARMACISTS_DATA_LOADING,
  ADMIN_PHARMACISTS_DATA_SUCCESS,
  ADMIN_PHARMACISTS_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types";

const initialState = {
  adminPharmacistsLoading: false,
  adminPharmacists: [],
};

export const adminListAllPharmacistsReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case ADMIN_PHARMACISTS_DATA_LOADING:
      return { ...state, adminPharmacistsLoading: action.payload };
    case ADMIN_PHARMACISTS_DATA_SUCCESS:
      return {
        ...state,
        adminPharmacists: action.payload,
      };
    case ADMIN_PHARMACISTS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
