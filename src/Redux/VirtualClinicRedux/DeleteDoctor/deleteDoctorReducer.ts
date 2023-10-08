import {
  DELETE_DOCTOR_DATA_LOADING,
  DELETE_DOCTOR_DATA_SUCCESS,
  DELETE_DOCTOR_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  deleteDoctorLoading: false,
  deletedDoctor: null,
};

export const deleteDoctorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DELETE_DOCTOR_DATA_LOADING:
      return { ...state, deleteDoctorLoading: action.payload };
    case DELETE_DOCTOR_DATA_SUCCESS:
      return {
        ...state,
        deletedDoctor: action.payload,
      };
    case DELETE_DOCTOR_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
