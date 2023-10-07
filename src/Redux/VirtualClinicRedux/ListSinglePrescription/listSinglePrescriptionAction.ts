import { Dispatch } from "redux";
import api from "api";
import { listSinglePrescription } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  PRESCRIPTIONS_DETAILS_DATA_SUCCESS,
  PRESCRIPTIONS_DETAILS_DATA_FAILURE,
  PRESCRIPTIONS_DETAILS_DATA_LOADING

} from "Redux/VirtualClinicRedux/types"; // Import your action types here

export const listSinglePrescriptionAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PRESCRIPTIONS_DETAILS_DATA_LOADING, payload: true });

      const response = await api.get(
        listSinglePrescription(requestBody._id)// Your Endpoint
        // requestBody, // (for requests with a body)
      );

      dispatch({ type: PRESCRIPTIONS_DETAILS_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: PRESCRIPTIONS_DETAILS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: PRESCRIPTIONS_DETAILS_DATA_LOADING, payload: false });
    }
  };
