import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { deletePackage } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  DELETING_PACKAGE_DATA_LOADING,
  DELETING_PACKAGE_DATA_SUCCESS,
  DELETING_PACKAGE_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const deletePackageAction = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: DELETING_PACKAGE_DATA_LOADING, payload: true });

    const response = await api.post(
      deletePackage(id) // Your Endpoint
    );

    dispatch({ type: DELETING_PACKAGE_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: DELETING_PACKAGE_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: DELETING_PACKAGE_DATA_LOADING, payload: false });
  }
};
