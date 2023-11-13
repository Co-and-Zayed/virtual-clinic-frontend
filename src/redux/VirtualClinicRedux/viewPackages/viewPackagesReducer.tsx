import {
    VIEW_PACKAGES_DATA_FAILURE,
    VIEW_PACKAGES_DATA_LOADING,
    VIEW_PACKAGES_DATA_SUCCESS,
  } from "redux/VirtualClinicRedux/types";

  const initialState = {
    viewPackagesLoading: false,
    userviewPackages: null,
  };

  export const  viewPackagesReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case VIEW_PACKAGES_DATA_LOADING:
        return { ...state, viewPackagesLoading: action.payload };
      case VIEW_PACKAGES_DATA_SUCCESS:
        return {
          ...state,
          userviewPackages: action.payload,
        };
      case VIEW_PACKAGES_DATA_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };