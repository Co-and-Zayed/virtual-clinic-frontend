import { Dispatch } from "redux";
import api from "api";
import { viewSubscribedPackageforFamilyMember } from "api/VirtualClinicRedux/apiUrls"; // Import your api url here
import {
  VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_FAILURE,
  VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_LOADING,
  VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_SUCCESS,
} from "redux/VirtualClinicRedux/types"; // Import your action types here

export const viewSubscribedPackageforFamilyMemberAction = (requestBody?: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_LOADING, payload: true });

    const response = await api.post(
      viewSubscribedPackageforFamilyMember(), // Your Endpoint
      requestBody, // (for requests with a body)
    );

    dispatch({ type: VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_FAILURE, payload: err });
  } finally {
    dispatch({ type: VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_LOADING, payload: false });
  }
};