import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { deleteAdmin } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  DELETED_ADMIN_DATA_LOADING,
  DELETED_ADMIN_DATA_SUCCESS,
  DELETED_ADMIN_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const deleteAdminAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DELETED_ADMIN_DATA_LOADING, payload: true });

      const response = await api.post(
        deleteAdmin(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: DELETED_ADMIN_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: DELETED_ADMIN_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: DELETED_ADMIN_DATA_LOADING, payload: false });
    }
  };
