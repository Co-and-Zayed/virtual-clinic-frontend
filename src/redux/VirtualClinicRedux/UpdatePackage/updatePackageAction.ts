import { Dispatch } from "redux";
import api from "api";
import { updatePackage } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  UPDATED_PACKAGE_DATA_LOADING,
  UPDATED_PACKAGE_DATA_SUCCESS,
  UPDATED_PACKAGE_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const updatePackageAction =
  (id: any, requestBody: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATED_PACKAGE_DATA_LOADING, payload: true });

      const response = await api.post(
        updatePackage(id), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: UPDATED_PACKAGE_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: UPDATED_PACKAGE_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: UPDATED_PACKAGE_DATA_LOADING, payload: false });
    }
  };
