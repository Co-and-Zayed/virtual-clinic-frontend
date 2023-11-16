import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { getFamilyMembers } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  GET_FAMILYMEMBERS_DATA_FAILURE,
  GET_FAMILYMEMBERS_DATA_LOADING,
  GET_FAMILYMEMBERS_DATA_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const getFamilyMembersAction =
  (requestBody?: any, withDiscounts?: boolean) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_FAMILYMEMBERS_DATA_LOADING, payload: true });

      const response = await api.get(
        getFamilyMembers() + (withDiscounts ? "?withDiscounts=true" : ""),
        requestBody // (for requests with a body)
      );

      dispatch({
        type: GET_FAMILYMEMBERS_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: GET_FAMILYMEMBERS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: GET_FAMILYMEMBERS_DATA_LOADING, payload: false });
    }
  };
