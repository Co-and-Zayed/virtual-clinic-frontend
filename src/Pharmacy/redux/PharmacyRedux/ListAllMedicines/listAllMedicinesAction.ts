import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { listAllMedicines } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  PATIENT_MEDICINE_DATA_LOADING,
  PATIENT_MEDICINE_DATA_SUCCESS,
  PATIENT_MEDICINE_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const listAllMedicinesAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PATIENT_MEDICINE_DATA_LOADING, payload: true });

      const response = await api.get(
        listAllMedicines() // Your Endpoint
        // requestBody, // (for requests with a body)
      );

      dispatch({ type: PATIENT_MEDICINE_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: PATIENT_MEDICINE_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: PATIENT_MEDICINE_DATA_LOADING, payload: false });
    }
  };
