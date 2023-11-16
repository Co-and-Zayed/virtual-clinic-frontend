import {
  PATIENT_HEALTH_RECORDS_DATA_LOADING,
  PATIENT_HEALTH_RECORDS_DATA_SUCCESS,
  PATIENT_HEALTH_RECORDS_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  packagesLoading: false,
  allPackages: null,
};

export const listAllPatientHealthRecordsReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case PATIENT_HEALTH_RECORDS_DATA_LOADING:
      return { ...state, packagesLoading: action.payload };
    case PATIENT_HEALTH_RECORDS_DATA_SUCCESS:
      return {
        ...state,
        allPackages: action.payload,
      };
    case PATIENT_HEALTH_RECORDS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
