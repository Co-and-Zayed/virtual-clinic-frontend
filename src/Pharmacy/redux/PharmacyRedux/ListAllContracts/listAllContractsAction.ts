import { Dispatch } from "redux";
import api from "Pharmacy/api";
import { viewAllContracts } from "Pharmacy/api/PharmacyRedux/apiUrls"; // Import your api url here
import {
  GET_CONTRACTS_DATA_LOADING,
  GET_CONTRACTS_DATA_SUCCESS,
  GET_CONTRACTS_DATA_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types"; // Import your action types here

export const listAllContractsAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_CONTRACTS_DATA_LOADING, payload: true });

      const response = await api.get(
        viewAllContracts() // Your Endpoint
        // requestBody, // (for requests with a body)
      );

      dispatch({ type: GET_CONTRACTS_DATA_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: GET_CONTRACTS_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: GET_CONTRACTS_DATA_LOADING, payload: false });
    }
  };
