import {
  PACKAGES_DATA_LOADING,
  PACKAGES_DATA_SUCCESS,
  PACKAGES_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  packagesLoading: false,
  allPackages: null,
};

export const listAllPackagesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PACKAGES_DATA_LOADING:
      return { ...state, packagesLoading: action.payload };
    case PACKAGES_DATA_SUCCESS:
      return {
        ...state,
        allPackages: action.payload,
      };
    case PACKAGES_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
