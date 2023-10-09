import { Dispatch } from "redux";
import api from "api";
import {
  getAppointments,
  listUpcomingAppointments,
} from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  GET_APPOINTMENTS_DATA_FAILURE,
  GET_APPOINTMENTS_DATA_LOADING,
  GET_APPOINTMENTS_DATA_SUCCESS,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const getAppointmentsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_APPOINTMENTS_DATA_LOADING, payload: true });

      const response = await api.post(
        listUpcomingAppointments(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: GET_APPOINTMENTS_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: GET_APPOINTMENTS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: GET_APPOINTMENTS_DATA_LOADING, payload: false });
    }
  };
