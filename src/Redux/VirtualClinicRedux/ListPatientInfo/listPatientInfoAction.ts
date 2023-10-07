import { Dispatch } from "redux";
import api from "api";
import { useLocation } from "react-router-dom";
import { listPatientInfo } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  PATIENT_INFO_DATA_LOADING,
  PATIENT_INFO_DATA_SUCCESS,
  PATIENT_INFO_DATA_FAILURE,
} from "Redux/VirtualClinicRedux/types"; // Import your action types here

export const listPatientInfoAction = (requestBody?: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: PATIENT_INFO_DATA_LOADING, payload: true });
    
    

    const response = await api.post(
        listPatientInfo({}), // we need to pass the id
        requestBody , // (for requests with a body)
    );

    dispatch({ type: PATIENT_INFO_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: PATIENT_INFO_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: PATIENT_INFO_DATA_LOADING, payload: false });
  }
};
