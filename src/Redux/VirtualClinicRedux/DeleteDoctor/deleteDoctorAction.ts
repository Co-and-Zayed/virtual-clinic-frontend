import { Dispatch } from "redux";
import api from "api";
import { deleteDoctor } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  DELETE_DOCTOR_DATA_LOADING,
  DELETE_DOCTOR_DATA_SUCCESS,
  DELETE_DOCTOR_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const deleteDoctorAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DELETE_DOCTOR_DATA_LOADING, payload: true });

      const response = await api.post(
        deleteDoctor(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: DELETE_DOCTOR_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: DELETE_DOCTOR_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: DELETE_DOCTOR_DATA_LOADING, payload: false });
    }
  };
