import {
    PATIENT_GET_DOCTORS_LOADING,
    PATIENT_GET_DOCTORS_SUCCESS,
    PATIENT_GET_DOCTORS_FAILURE,
  } from "redux/VirtualClinicRedux/types";
  
  const initialState = {
    doctorsLoading: false,
    allDoctors: [],
  };
  
  export const patientGetDoctorsReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case PATIENT_GET_DOCTORS_LOADING:
        return { ...state, usersLoading: action.payload };
      case PATIENT_GET_DOCTORS_SUCCESS:
        return {
          ...state,
          allDoctors: action.payload,
        };
      case PATIENT_GET_DOCTORS_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  