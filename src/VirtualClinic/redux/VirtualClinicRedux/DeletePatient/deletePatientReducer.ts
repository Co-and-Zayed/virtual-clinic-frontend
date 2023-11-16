import {
  DELETE_PATIENT_DATA_LOADING,
  DELETE_PATIENT_DATA_SUCCESS,
  DELETE_PATIENT_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  deletePatientLoading: false,
  deletedPatient: null,
};

export const deletePatientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DELETE_PATIENT_DATA_LOADING:
      return { ...state, deletePatientLoading: action.payload };
    case DELETE_PATIENT_DATA_SUCCESS:
      return {
        ...state,
        deletedPatient: action.payload,
      };
    case DELETE_PATIENT_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
