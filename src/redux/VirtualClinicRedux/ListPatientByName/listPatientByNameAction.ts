import { Dispatch } from "redux";
import api from "api";
import { listPatientByName } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  SEARCH_PATIENT_LOADING,
  SEARCH_PATIENT_SUCCESS,
  SEARCH_PATIENT_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const listPatientByNameAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: SEARCH_PATIENT_LOADING, payload: true });

      const response = await api.post(
        listPatientByName(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: SEARCH_PATIENT_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: SEARCH_PATIENT_FAILURE, payload: err });
    } finally {
      dispatch({ type: SEARCH_PATIENT_LOADING, payload: false });
    }
  };
