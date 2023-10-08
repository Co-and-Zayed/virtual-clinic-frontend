import { App } from "antd";
import {
    GET_APPOINTMENTS_DATA_FAILURE,
    GET_APPOINTMENTS_DATA_LOADING,
    GET_APPOINTMENTS_DATA_SUCCESS,
  } from "redux/VirtualClinicRedux/types";
  
  const initialState = {
    appointmentLoading: false,
    userAppointments: null,
  };
  
  export const getAppointmentsReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case GET_APPOINTMENTS_DATA_LOADING:
        return { ...state, appointmentLoading: action.payload };
      case GET_APPOINTMENTS_DATA_SUCCESS:
        return {
          ...state,
          userAppointments: action.payload,
        };
      case GET_APPOINTMENTS_DATA_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  