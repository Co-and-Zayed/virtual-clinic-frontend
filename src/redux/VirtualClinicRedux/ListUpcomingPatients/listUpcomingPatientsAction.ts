import { Dispatch } from "redux";
import api from "api";
import { listUpcomingAppointments } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  UPCOMING_PATIENTS_DATA_LOADING,
  UPCOMING_PATIENTS_DATA_SUCCESS,
  UPCOMING_PATIENTS_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const listUpcomingPatientsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPCOMING_PATIENTS_DATA_LOADING, payload: true });

      const response = await api.post(
        listUpcomingAppointments(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({
        type: UPCOMING_PATIENTS_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: UPCOMING_PATIENTS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: UPCOMING_PATIENTS_DATA_LOADING, payload: false });
    }
  };
