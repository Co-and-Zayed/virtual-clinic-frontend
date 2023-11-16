import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { listAllMedicinalUses } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  ALL_MEDICINAL_USES_LOADING,
  ALL_MEDICINAL_USES_SUCCESS,
  ALL_MEDICINAL_USES_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const allMedicinalUsesAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ALL_MEDICINAL_USES_LOADING, payload: true });

      const response = await api.get(
        listAllMedicinalUses() // Your Endpoint
        // requestBody, // (for requests with a body)
      );

      dispatch({ type: ALL_MEDICINAL_USES_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: ALL_MEDICINAL_USES_FAILURE, payload: err });
    } finally {
      dispatch({ type: ALL_MEDICINAL_USES_LOADING, payload: false });
    }
  };
