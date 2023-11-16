import { Dispatch } from "redux";
import api from "VirtualClinic/api";
import { viewPackagePrice } from "VirtualClinic/api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  VIEW_PACKAGE_PRICE_DATA_FAILURE,
  VIEW_PACKAGE_PRICE_DATA_LOADING,
  VIEW_PACKAGE_PRICE_DATA_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types"; // Import your action types here

export const viewPackagePriceAction =
  (requestBody?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: VIEW_PACKAGE_PRICE_DATA_LOADING, payload: true });

      const response = await api.post(
        viewPackagePrice(), // Your Endpoint
        requestBody // (for requests with a body)
      );

      dispatch({
        type: VIEW_PACKAGE_PRICE_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: VIEW_PACKAGE_PRICE_DATA_FAILURE, payload: err });
    } finally {
      dispatch({ type: VIEW_PACKAGE_PRICE_DATA_LOADING, payload: false });
    }
  };
