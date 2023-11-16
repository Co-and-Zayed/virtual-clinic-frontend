import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { createAppointment } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  POST_APPOINTMENT_DATA_FAILURE,
  POST_APPOINTMENT_DATA_LOADING,
  POST_APPOINTMENT_DATA_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const createAppointmentAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: POST_APPOINTMENT_DATA_LOADING, payload: true });

      const response = await api.post(
        createAppointment(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: POST_APPOINTMENT_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: POST_APPOINTMENT_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: POST_APPOINTMENT_DATA_LOADING, payload: false });
    }
  };
