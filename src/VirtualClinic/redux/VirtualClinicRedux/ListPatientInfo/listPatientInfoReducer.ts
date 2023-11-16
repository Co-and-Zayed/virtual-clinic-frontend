import {
  PATIENT_INFO_DATA_LOADING,
  PATIENT_INFO_DATA_SUCCESS,
  PATIENT_INFO_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  patientInfoLoading: false,
  patientInfo: [],
};

export const listPatientInfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PATIENT_INFO_DATA_LOADING:
      return { ...state, patientInfoLoading: action.payload };
    case PATIENT_INFO_DATA_SUCCESS:
      return {
        ...state,
        patientInfo: action.payload,
      };
    case PATIENT_INFO_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
