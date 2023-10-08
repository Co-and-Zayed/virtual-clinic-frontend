import { App } from "antd";
import {
    DELETE_APPOINTMENT_DATA_FAILURE,
    DELETE_APPOINTMENT_DATA_LOADING,
    DELETE_APPOINTMENT_DATA_SUCCESS,
  } from "redux/VirtualClinicRedux/types";
  
  const initialState = {
    appointmentLoading: false,
    confirm: null,
  };
  
  export const deleteAppointmentReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case DELETE_APPOINTMENT_DATA_LOADING:
        return { ...state, appointmentLoading: action.payload };
      case DELETE_APPOINTMENT_DATA_SUCCESS:
        return {
          ...state,
          confirm: action.payload,
        };
      case DELETE_APPOINTMENT_DATA_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  