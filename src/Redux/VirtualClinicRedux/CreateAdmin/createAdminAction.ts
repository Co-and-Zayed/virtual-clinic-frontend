import { Dispatch } from "redux";
import api from "api";
import { createAdmin } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  CREATED_ADMIN_DATA_LOADING,
  CREATED_ADMIN_DATA_SUCCESS,
  CREATED_ADMIN_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const createAdminAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CREATED_ADMIN_DATA_LOADING, payload: true });

      console.log("GETTING RESPONSE");
      const response = await api.post(
        createAdmin(), // Your Endpoint
        requestBody // (for requests with a body)
      );
      console.log("RESPONSSEEE", response.data);

      dispatch({ type: CREATED_ADMIN_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      console.log("ERROR", err);
      dispatch({ type: CREATED_ADMIN_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: CREATED_ADMIN_DATA_LOADING, payload: false });
    }
  };
