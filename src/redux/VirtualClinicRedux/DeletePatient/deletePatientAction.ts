import { Dispatch } from "redux";
import api from "api";
import { deletePatient } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  DELETE_PATIENT_DATA_LOADING,
  DELETE_PATIENT_DATA_SUCCESS,
  DELETE_PATIENT_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const deletePatientAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DELETE_PATIENT_DATA_LOADING, payload: true });

      const response = await api.post(
        deletePatient(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: DELETE_PATIENT_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: DELETE_PATIENT_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: DELETE_PATIENT_DATA_LOADING, payload: false });
    }
  };
