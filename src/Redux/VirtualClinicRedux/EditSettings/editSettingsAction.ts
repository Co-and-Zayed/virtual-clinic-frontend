import { Dispatch } from "redux";
import api from "api";
import { editSettings } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  EDIT_DOCTOR_SETTINGS_DATA_LOADING,
  EDIT_DOCTOR_SETTINGS_DATA_SUCCESS,
  EDIT_DOCTOR_SETTINGS_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const editSettingsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: EDIT_DOCTOR_SETTINGS_DATA_LOADING, payload: true });

      const response = await api.patch(
        editSettings(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({
        type: EDIT_DOCTOR_SETTINGS_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: EDIT_DOCTOR_SETTINGS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: EDIT_DOCTOR_SETTINGS_DATA_LOADING, payload: false });
    }
  };
