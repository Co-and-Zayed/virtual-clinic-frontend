import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { viewPatients } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  ADMIN_PATIENTS_DATA_LOADING,
  ADMIN_PATIENTS_DATA_SUCCESS,
  ADMIN_PATIENTS_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const adminListAllPatientsAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ADMIN_PATIENTS_DATA_LOADING, payload: true });

    const response = await api.get(
      viewPatients() // Your Endpoint
      // requestBody, // (for requests with a body)
    );

    dispatch({ type: ADMIN_PATIENTS_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: ADMIN_PATIENTS_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: ADMIN_PATIENTS_DATA_LOADING, payload: false });
  }
};
