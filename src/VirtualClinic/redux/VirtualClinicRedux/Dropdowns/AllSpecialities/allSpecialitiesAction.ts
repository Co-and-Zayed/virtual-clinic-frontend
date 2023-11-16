import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { allSpecialities } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  ALL_SPECILATIES_LOADING,
  ALL_SPECILATIES_SUCCESS,
  ALL_SPECILATIES_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const allSpecialitiesAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ALL_SPECILATIES_LOADING, payload: true });

      const response = await api.get(
        allSpecialities() // Your Endpoint
        // requestBody, // (for requests with a body)
      );

      dispatch({ type: ALL_SPECILATIES_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: ALL_SPECILATIES_FAILURE, payload: err });
    } finally {
      dispatch({ type: ALL_SPECILATIES_LOADING, payload: false });
    }
  };
