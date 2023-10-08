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
    
    

    const location = useLocation();

// Get the _id from the location.state._id property
        const _id = location.state._id;
        console.log(_id+"###"); 
// Use the _id as a parameter for listPatientInfo
        const response = await api.post(
          listPatientInfo(), // Your Endpoint
          
          requestBody , // (for requests with a body)
);
        console.log(location+"###"); // prints the whole location object
        console.log(location.pathname+"###"); // prints the current pathname
        console.log(location.search+"###"); // prints the current query string


    dispatch({ type: PATIENT_INFO_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: PATIENT_INFO_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: PATIENT_INFO_DATA_LOADING, payload: false });
  }
};
