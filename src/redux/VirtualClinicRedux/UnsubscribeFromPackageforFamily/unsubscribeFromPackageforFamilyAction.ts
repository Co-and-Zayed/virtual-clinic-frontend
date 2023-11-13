import { Dispatch } from "redux";
import api from "api";
import { unsubscribeFromPackageForFamily } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_FAILURE,
  UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_LOADING,
  UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_SUCCESS,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const unsubscribeFromPackageForFamilyAction = (requestBody?: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_LOADING, payload: true });

    const response = await api.post(
      unsubscribeFromPackageForFamily(), // Your Endpoint
      requestBody, // (for requests with a body)
    );

    dispatch({ type: UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: UNSUBSCRIBE_FROM_PACKAGE_FOR_FAMILY_DATA_LOADING, payload: false });
  }
};