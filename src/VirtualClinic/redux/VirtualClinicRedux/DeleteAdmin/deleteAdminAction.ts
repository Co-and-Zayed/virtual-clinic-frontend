import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { deleteAdmin } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  DELETED_ADMIN_DATA_LOADING,
  DELETED_ADMIN_DATA_SUCCESS,
  DELETED_ADMIN_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const deleteAdminAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: DELETED_ADMIN_DATA_LOADING, payload: true });

      console.log("DELETING RESPONSE", requestBody);
      const response = await api.post(
        deleteAdmin(), // Your Endpoint
        requestBody // (for requests with a body)
      );
      console.log("DELETINGGGG RESPONSSEEE 2", response.data);

      dispatch({ type: DELETED_ADMIN_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      console.log("ERROR", err);
      dispatch({ type: DELETED_ADMIN_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: DELETED_ADMIN_DATA_LOADING, payload: false });
    }
  };
