import { Dispatch } from "redux";
import api from "api";
import { unsubscribeFromPackage } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  UNSUBSCRIBE_FROM_PACKAGE_DATA_FAILURE,
  UNSUBSCRIBE_FROM_PACKAGE_DATA_LOADING,
  UNSUBSCRIBE_FROM_PACKAGE_DATA_SUCCESS,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const unsubscribeFromPackageAction = (requestBody?: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: UNSUBSCRIBE_FROM_PACKAGE_DATA_LOADING, payload: true });

    const response = await api.post(
      unsubscribeFromPackage(), // Your Endpoint
      requestBody, // (for requests with a body)
    );

    dispatch({ type: UNSUBSCRIBE_FROM_PACKAGE_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: UNSUBSCRIBE_FROM_PACKAGE_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: UNSUBSCRIBE_FROM_PACKAGE_DATA_LOADING, payload: false });
  }
};