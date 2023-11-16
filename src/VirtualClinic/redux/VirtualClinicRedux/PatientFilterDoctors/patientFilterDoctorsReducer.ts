import {
  PATIENT_GET_DOCTORS_LOADING,
  PATIENT_GET_DOCTORS_SUCCESS,
  PATIENT_FILTER_DOCTORS_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  doctorsLoading: false,
  allDoctors: [],
};

export const patientFilterDoctorsReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case PATIENT_GET_DOCTORS_LOADING:
      return { ...state, doctorsLoading: action.payload };
    case PATIENT_GET_DOCTORS_SUCCESS:
      return {
        ...state,
        allDoctors: action.payload,
      };
    case PATIENT_FILTER_DOCTORS_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
