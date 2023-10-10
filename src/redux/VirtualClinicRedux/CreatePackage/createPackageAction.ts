import { Dispatch } from "redux";
import api from "api";
import { createPackage } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  CREATED_PACKAGE_DATA_LOADING,
  CREATED_PACKAGE_DATA_SUCCESS,
  CREATED_PACKAGE_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const createPackageAction =
  (requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CREATED_PACKAGE_DATA_LOADING, payload: true });

      const response = await api.post(
        createPackage(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: CREATED_PACKAGE_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: CREATED_PACKAGE_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: CREATED_PACKAGE_DATA_LOADING, payload: false });
    }
  };
