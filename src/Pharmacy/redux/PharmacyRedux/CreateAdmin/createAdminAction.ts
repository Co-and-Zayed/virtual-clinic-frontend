import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { createAdmin } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  CREATED_ADMIN_DATA_LOADING,
  CREATED_ADMIN_DATA_SUCCESS,
  CREATED_ADMIN_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const createAdminAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CREATED_ADMIN_DATA_LOADING, payload: true });

      const response = await api.post(
        createAdmin(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: CREATED_ADMIN_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: CREATED_ADMIN_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: CREATED_ADMIN_DATA_LOADING, payload: false });
    }
  };
