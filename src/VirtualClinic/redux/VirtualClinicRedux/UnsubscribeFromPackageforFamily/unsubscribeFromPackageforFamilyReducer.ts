import {
  UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_FAILURE,
  UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_LOADING,
  UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  unsubsribeFromPackageForFamilyLoading: false,
  userUnsubsribeFromPackageForFamily: null,
};

export const unsubscribeFromPackageForFamilyReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_LOADING:
      return {
        ...state,
        unsubsribeFromPackageforFamilyLoading: action.payload,
      };
    case UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_SUCCESS:
      return {
        ...state,
        userUnsubsribeFromPackageforFamily: action.payload,
      };
    case UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
