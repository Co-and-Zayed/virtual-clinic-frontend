import {
  UPDATED_PACKAGE_DATA_LOADING,
  UPDATED_PACKAGE_DATA_SUCCESS,
  UPDATED_PACKAGE_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  updatePackageLoading: false,
  updatedPackage: null,
};

export const updatePackageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATED_PACKAGE_DATA_LOADING:
      return { ...state, updatePackageLoading: action.payload };
    case UPDATED_PACKAGE_DATA_SUCCESS:
      return {
        ...state,
        updatedPackage: action.payload,
      };
    case UPDATED_PACKAGE_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
