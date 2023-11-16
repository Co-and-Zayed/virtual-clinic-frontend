import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { viewPatients } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  ADMIN_PATIENTS_DATA_LOADING,
  ADMIN_PATIENTS_DATA_SUCCESS,
  ADMIN_PATIENTS_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

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
