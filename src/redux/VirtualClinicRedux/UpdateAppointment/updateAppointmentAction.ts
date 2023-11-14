import { Dispatch } from "redux";
import api from "api";
import { updateAppointment } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  PUT_APPOINTMENT_DATA_FAILURE,
  PUT_APPOINTMENT_DATA_LOADING,
  PUT_APPOINTMENT_DATA_SUCCESS,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const updateAppointmentAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PUT_APPOINTMENT_DATA_LOADING, payload: true });

      const response = await api.put(
        updateAppointment(requestBody.id), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: PUT_APPOINTMENT_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: PUT_APPOINTMENT_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: PUT_APPOINTMENT_DATA_LOADING, payload: false });
    }
  };
