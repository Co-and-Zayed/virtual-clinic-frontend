import {
    PRESCRIPTIONS_DETAILS_DATA_LOADING,
    PRESCRIPTIONS_DETAILS_DATA_SUCCESS,
    PRESCRIPTIONS_DETAILS_DATA_FAILURE
  } from "Redux/VirtualClinicRedux/types";
  
  const initialState = {
    prescriptionLoading: false,
    prescription: null,
  };
  
  export const listSinglePrescriptionReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case PRESCRIPTIONS_DETAILS_DATA_LOADING:
        return { ...state, prescriptionLoading: action.payload };
      case PRESCRIPTIONS_DETAILS_DATA_SUCCESS:
        return {
          ...state,
          prescription: action.payload,
        };
      case PRESCRIPTIONS_DETAILS_DATA_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  