import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { listAllPrescriptions } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  PATIENT_HEALTH_RECORDS_DATA_FAILURE,
  PATIENT_HEALTH_RECORDS_DATA_LOADING,
  PATIENT_HEALTH_RECORDS_DATA_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const listAllPatientHealthRecordsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PATIENT_HEALTH_RECORDS_DATA_LOADING, payload: true });

      const response = await api.get(
        listAllPrescriptions() // Your Endpoint
        // requestBody // (for requests with a body)
      );

      dispatch({
        type: PATIENT_HEALTH_RECORDS_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: PATIENT_HEALTH_RECORDS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: PATIENT_HEALTH_RECORDS_DATA_LOADING, payload: false });
    }
  };
