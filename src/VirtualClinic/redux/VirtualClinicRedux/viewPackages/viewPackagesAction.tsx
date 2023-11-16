import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { viewPackages } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  VIEW_PACKAGES_DATA_FAILURE,
  VIEW_PACKAGES_DATA_LOADING,
  VIEW_PACKAGES_DATA_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const viewPackagesAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: VIEW_PACKAGES_DATA_LOADING, payload: true });

      const response = await api.post(
        viewPackages(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: VIEW_PACKAGES_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: VIEW_PACKAGES_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: VIEW_PACKAGES_DATA_LOADING, payload: false });
    }
  };
