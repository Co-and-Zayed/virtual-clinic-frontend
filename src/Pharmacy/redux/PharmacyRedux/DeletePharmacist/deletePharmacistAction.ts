import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { deletePharmacist } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  DELETE_PHARMACIST_DATA_LOADING,
  DELETE_PHARMACIST_DATA_SUCCESS,
  DELETE_PHARMACIST_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const deletePharmacistAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DELETE_PHARMACIST_DATA_LOADING, payload: true });

      const response = await api.post(
        deletePharmacist(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({
        type: DELETE_PHARMACIST_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: DELETE_PHARMACIST_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: DELETE_PHARMACIST_DATA_LOADING, payload: false });
    }
  };
