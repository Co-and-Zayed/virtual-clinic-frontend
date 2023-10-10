import { Dispatch } from "redux";
import api from "api";
import { listAllPackages } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  PACKAGES_DATA_LOADING,
  PACKAGES_DATA_SUCCESS,
  PACKAGES_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const listAllPackagesAction = (requestBody?: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: PACKAGES_DATA_LOADING, payload: true });

    const response = await api.get(
      listAllPackages(), // Your Endpoint
      // requestBody, // (for requests with a body)
    );

    dispatch({ type: PACKAGES_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: PACKAGES_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: PACKAGES_DATA_LOADING, payload: false });
  }
};
