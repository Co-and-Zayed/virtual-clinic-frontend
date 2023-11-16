import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { getDoctorInfo } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here  wich one
import {
  DOCTOR_DATA_LOADING,
  DOCTOR_DATA_SUCCESS,
  DOCTOR_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const getDoctorInfoAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DOCTOR_DATA_LOADING, payload: true });

      const response = await api.post(
        getDoctorInfo(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: DOCTOR_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: DOCTOR_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: DOCTOR_DATA_LOADING, payload: false });
    }
  };
