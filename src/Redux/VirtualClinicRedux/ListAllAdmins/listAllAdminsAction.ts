import { Dispatch } from "redux";
import api from "api";
import { listAllAdmins } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  ALL_ADMINS_DATA_LOADING,
  ALL_ADMINS_DATA_SUCCESS,
  ALL_ADMINS_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const listAllAdminsAction = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ALL_ADMINS_DATA_LOADING, payload: true });

    const response = await api.get(
      listAllAdmins(id) // Your Endpoint
      // requestBody, // (for requests with a body)
    );

    dispatch({ type: ALL_ADMINS_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: ALL_ADMINS_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: ALL_ADMINS_DATA_LOADING, payload: false });
  }
};
