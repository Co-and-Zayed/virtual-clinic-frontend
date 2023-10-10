import {
  DOCTOR_DATA_LOADING,
  DOCTOR_DATA_SUCCESS,
  DOCTOR_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  doctorLoading: false,
  docinfo: null,
};

export const getDoctorInfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DOCTOR_DATA_LOADING:
      return { ...state, usersLoading: action.payload };
    case DOCTOR_DATA_SUCCESS:
      return {
        ...state,
        docinfo: action.payload,
      };
    case DOCTOR_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
