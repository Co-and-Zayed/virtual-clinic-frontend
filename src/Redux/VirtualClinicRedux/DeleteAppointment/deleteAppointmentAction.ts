import { Dispatch } from "redux";
import api from "api";
import { deleteAppointment } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
    DELETE_APPOINTMENT_DATA_FAILURE,
    DELETE_APPOINTMENT_DATA_LOADING,
    DELETE_APPOINTMENT_DATA_SUCCESS,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const deleteAppointmentAction = (requestBody?: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: DELETE_APPOINTMENT_DATA_LOADING, payload: true });

    const response = await api.post(
      deleteAppointment(
        {
          email: requestBody.email,
        }
      ), // Your Endpoint
      requestBody, // (for requests with a body)
    );

    dispatch({ type: DELETE_APPOINTMENT_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: DELETE_APPOINTMENT_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: DELETE_APPOINTMENT_DATA_LOADING, payload: false });
  }
};
