import {
    VIEW_PACKAGE_PRICE_DATA_FAILURE,
    VIEW_PACKAGE_PRICE_DATA_LOADING,
    VIEW_PACKAGE_PRICE_DATA_SUCCESS,
  } from "redux/VirtualClinicRedux/types";
  
  const initialState = {
    viewPackagePriceLoading: false,
    userViewPackagePrice: null,
  };
  
  export const viewPackagePriceReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case VIEW_PACKAGE_PRICE_DATA_LOADING:
        return { ...state, viewPackagePriceLoading: action.payload };
      case VIEW_PACKAGE_PRICE_DATA_SUCCESS:
        return {
          ...state,
          userViewPackagePrice: action.payload,
        };
      case VIEW_PACKAGE_PRICE_DATA_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  