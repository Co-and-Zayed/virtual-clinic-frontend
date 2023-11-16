import { App } from "antd";
import {
  PUT_APPOINTMENT_DATA_FAILURE,
  PUT_APPOINTMENT_DATA_LOADING,
  PUT_APPOINTMENT_DATA_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  appointmentLoading: false,
  updated: null,
};

export const updateAppointmentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PUT_APPOINTMENT_DATA_LOADING:
      return { ...state, appointmentLoading: action.payload };
    case PUT_APPOINTMENT_DATA_SUCCESS:
      return {
        ...state,
        updated: action.payload,
      };
    case PUT_APPOINTMENT_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
