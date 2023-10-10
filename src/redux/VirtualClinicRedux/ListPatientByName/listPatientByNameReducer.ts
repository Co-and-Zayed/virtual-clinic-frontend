import {
  SEARCH_PATIENT_LOADING,
  SEARCH_PATIENT_SUCCESS,
  SEARCH_PATIENT_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  searchPatient: false,
  patient: null,
};

export const listPatientByNameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_PATIENT_LOADING:
      return { ...state, searchPatient: action.payload };
    case SEARCH_PATIENT_SUCCESS:
      return {
        ...state,
        patient: action.payload,
      };
    case SEARCH_PATIENT_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
