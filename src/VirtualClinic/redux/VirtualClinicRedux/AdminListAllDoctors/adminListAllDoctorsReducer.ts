import {
  ADMIN_DOCTORS_DATA_LOADING,
  ADMIN_DOCTORS_DATA_SUCCESS,
  ADMIN_DOCTORS_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  adminDoctorsLoading: false,
  adminDoctors: null,
};

export const adminListAllDoctorsReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case ADMIN_DOCTORS_DATA_LOADING:
      return { ...state, adminDoctorsLoading: action.payload };
    case ADMIN_DOCTORS_DATA_SUCCESS:
      return {
        ...state,
        adminDoctors: action.payload,
      };
    case ADMIN_DOCTORS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
