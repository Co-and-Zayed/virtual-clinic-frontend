import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { listAllPrescriptions } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  PRESCRIPTIONS_DATA_SUCCESS,
  PRESCRIPTIONS_DATA_FAILURE,
  PRESCRIPTIONS_DATA_LOADING,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const listAllPrescriptionsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PRESCRIPTIONS_DATA_LOADING, payload: true });

      const response = await api.post(
        listAllPrescriptions(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: PRESCRIPTIONS_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: PRESCRIPTIONS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: PRESCRIPTIONS_DATA_LOADING, payload: false });
    }
  };
