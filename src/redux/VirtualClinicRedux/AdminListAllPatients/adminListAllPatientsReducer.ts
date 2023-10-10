import {
  ADMIN_PATIENTS_DATA_LOADING,
  ADMIN_PATIENTS_DATA_SUCCESS,
  ADMIN_PATIENTS_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  adminPatientsLoading: false,
  adminPatients: null,
};

export const adminListAllPatientsReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case ADMIN_PATIENTS_DATA_LOADING:
      return { ...state, adminPatientsLoading: action.payload };
    case ADMIN_PATIENTS_DATA_SUCCESS:
      return {
        ...state,
        adminPatients: action.payload,
      };
    case ADMIN_PATIENTS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
