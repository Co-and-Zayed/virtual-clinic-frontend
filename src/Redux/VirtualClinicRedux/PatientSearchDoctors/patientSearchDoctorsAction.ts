import { Dispatch } from "redux";
import api from "api";
import { patientSearchDoctors } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  PATIENT_GET_DOCTORS_LOADING,
  PATIENT_GET_DOCTORS_SUCCESS,
  PATIENT_SEARCH_DOCTORS_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const patientSearchDoctorsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PATIENT_GET_DOCTORS_LOADING, payload: true });

      const response = await api.post(
        patientSearchDoctors(), // Your Endpoint
        requestBody, // (for requests with a body)
      );

      dispatch({ type: PATIENT_GET_DOCTORS_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: PATIENT_SEARCH_DOCTORS_FAILURE, payload: err });
    } finally {
      dispatch({ type: PATIENT_GET_DOCTORS_LOADING, payload: false });
    }
  };
