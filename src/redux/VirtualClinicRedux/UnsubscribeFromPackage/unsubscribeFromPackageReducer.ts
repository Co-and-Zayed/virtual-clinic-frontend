import {
    UNSUBSCRIBE_FROM_PACKAGE_DATA_FAILURE,
    UNSUBSCRIBE_FROM_PACKAGE_DATA_LOADING,
    UNSUBSCRIBE_FROM_PACKAGE_DATA_SUCCESS,
  } from "redux/VirtualClinicRedux/types";

  const initialState = {
    unsubsribeFromPackageLoading: false,
    userUnsubsribeFromPackage: null,
  };

  export const  unsubscribeFromPackageReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case UNSUBSCRIBE_FROM_PACKAGE_DATA_LOADING:
        return { ...state, unsubsribeFromPackageLoading: action.payload };
      case UNSUBSCRIBE_FROM_PACKAGE_DATA_SUCCESS:
        return {
          ...state,
          userUnsubsribeFromPackage: action.payload,
        };
      case UNSUBSCRIBE_FROM_PACKAGE_DATA_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };