import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { viewDoctors } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  ADMIN_DOCTORS_DATA_LOADING,
  ADMIN_DOCTORS_DATA_SUCCESS,
  ADMIN_DOCTORS_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const adminListAllDoctorsAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ADMIN_DOCTORS_DATA_LOADING, payload: true });

    const response = await api.get(
      viewDoctors() // Your Endpoint
      // requestBody, // (for requests with a body)
    );

    dispatch({ type: ADMIN_DOCTORS_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: ADMIN_DOCTORS_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: ADMIN_DOCTORS_DATA_LOADING, payload: false });
  }
};
