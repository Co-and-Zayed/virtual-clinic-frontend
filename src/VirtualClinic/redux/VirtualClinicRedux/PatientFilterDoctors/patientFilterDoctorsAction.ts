import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { patientFilterDoctors } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  PATIENT_GET_DOCTORS_LOADING,
  PATIENT_GET_DOCTORS_SUCCESS,
  PATIENT_FILTER_DOCTORS_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here
import store from "VirtualClinic/redux/store";

export const patientFilterDoctorsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PATIENT_GET_DOCTORS_LOADING, payload: true });

      const response = await api.post(
        patientFilterDoctors(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: PATIENT_GET_DOCTORS_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: PATIENT_FILTER_DOCTORS_FAILURE, payload: err });
    } finally {
      dispatch({ type: PATIENT_GET_DOCTORS_LOADING, payload: false });
    }
  };
