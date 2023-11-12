import { Dispatch } from "redux";
import api from "api";
import { getFamilyMembers } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  GET_FAMILYMEMBERS_DATA_FAILURE,
  GET_FAMILYMEMBERS_DATA_LOADING,
  GET_FAMILYMEMBERS_DATA_SUCCESS,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const getFamilyMembersAction = (requestBody?: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_FAMILYMEMBERS_DATA_LOADING, payload: true });

    const response = await api.get(
      getFamilyMembers(), // Your Endpoint
      requestBody, // (for requests with a body)
    );

    dispatch({ type: GET_FAMILYMEMBERS_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_FAMILYMEMBERS_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: GET_FAMILYMEMBERS_DATA_LOADING, payload: false });
  }
};
