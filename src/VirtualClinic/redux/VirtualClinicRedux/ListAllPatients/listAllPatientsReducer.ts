import {
  PATIENTS_DATA_LOADING,
  PATIENTS_DATA_SUCCESS,
  PATIENTS_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  patientsLoading: false,
  allPatients: null,
};

export const listAllPatientsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PATIENTS_DATA_LOADING:
      return { ...state, patientsLoading: action.payload };
    case PATIENTS_DATA_SUCCESS:
      return {
        ...state,
        allPatients: action.payload,
      };
    case PATIENTS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
