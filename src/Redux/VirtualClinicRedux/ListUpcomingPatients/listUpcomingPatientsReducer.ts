import {
  UPCOMING_PATIENTS_DATA_LOADING,
  UPCOMING_PATIENTS_DATA_SUCCESS,
  UPCOMING_PATIENTS_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  patientsLoading: false,
  allPatients: null,
};

export const listUpcomingPatientsReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case UPCOMING_PATIENTS_DATA_LOADING:
      return { ...state, patientsLoading: action.payload };
    case UPCOMING_PATIENTS_DATA_SUCCESS:
      return {
        ...state,
        allPatients: action.payload,
      };
    case UPCOMING_PATIENTS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
