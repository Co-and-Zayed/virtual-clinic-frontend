import {
  DELETING_PACKAGE_DATA_LOADING,
  DELETING_PACKAGE_DATA_SUCCESS,
  DELETING_PACKAGE_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  deletingPackageLoading: false,
  deletedPackage: null,
};

export const deletePackageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DELETING_PACKAGE_DATA_LOADING:
      return { ...state, deletingPackageLoading: action.payload };
    case DELETING_PACKAGE_DATA_SUCCESS:
      return {
        ...state,
        deletedPackage: action.payload,
      };
    case DELETING_PACKAGE_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
