import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { viewSettings } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  DOCTOR_SETTINGS_DATA_LOADING,
  DOCTOR_SETTINGS_DATA_SUCCESS,
  DOCTOR_SETTINGS_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const listDoctorSettingsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DOCTOR_SETTINGS_DATA_LOADING, payload: true });

      const response = await api.post(
        viewSettings(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: DOCTOR_SETTINGS_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: DOCTOR_SETTINGS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: DOCTOR_SETTINGS_DATA_LOADING, payload: false });
    }
  };
