import {
  PATIENT_MEDICINE_DATA_LOADING,
  PATIENT_MEDICINE_DATA_SUCCESS,
  PATIENT_MEDICINE_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types";

const initialState = {
  medicinesLoading: false,
  allMedicines: null,
};

export const listAllMedicinesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PATIENT_MEDICINE_DATA_LOADING:
      return { ...state, medicinesLoading: action.payload };
    case PATIENT_MEDICINE_DATA_SUCCESS:
      return {
        ...state,
        allMedicines: action.payload,
      };
    case PATIENT_MEDICINE_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
