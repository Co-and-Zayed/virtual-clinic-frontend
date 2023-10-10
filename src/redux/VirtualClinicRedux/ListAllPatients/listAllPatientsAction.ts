import { Dispatch } from "redux";
import api from "api";
import { listAllPatients } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  PATIENTS_DATA_LOADING,
  PATIENTS_DATA_SUCCESS,
  PATIENTS_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const listAllPatientsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PATIENTS_DATA_LOADING, payload: true });

      const response = await api.post(
        listAllPatients(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: PATIENTS_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: PATIENTS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: PATIENTS_DATA_LOADING, payload: false });
    }
  };
