import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { addFamilyMember } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  ADD_FAMILYMEMBER_DATA_FAILURE,
  ADD_FAMILYMEMBER_DATA_LOADING,
  ADD_FAMILYMEMBER_DATA_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const addFamilyMemberAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ADD_FAMILYMEMBER_DATA_LOADING, payload: true });

      const response = await api.post(
        addFamilyMember(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({ type: ADD_FAMILYMEMBER_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: ADD_FAMILYMEMBER_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: ADD_FAMILYMEMBER_DATA_LOADING, payload: false });
    }
  };
