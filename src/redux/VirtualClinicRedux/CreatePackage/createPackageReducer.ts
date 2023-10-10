import {
  CREATED_PACKAGE_DATA_LOADING,
  CREATED_PACKAGE_DATA_SUCCESS,
  CREATED_PACKAGE_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  creatingPackageLoading: false,
  createdPackage: null,
};

export const createPackageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATED_PACKAGE_DATA_LOADING:
      return { ...state, creatingPackageLoading: action.payload };
    case CREATED_PACKAGE_DATA_SUCCESS:
      return {
        ...state,
        createdPackage: action.payload,
      };
    case CREATED_PACKAGE_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
