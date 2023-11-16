import {
  VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_FAILURE,
  VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_LOADING,
  VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  viewSubscribedPackageForFamilyMemberLoading: false,
  userViewSubscribedPackageForFamilyMember: null,
};

export const viewSubscribedPackageForFamilyMemberReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_LOADING:
      return {
        ...state,
        viewSubscribedPackageForFamilyMemberLoading: action.payload,
      };
    case VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_SUCCESS:
      return {
        ...state,
        userViewSubscribedPackageForFamilyMember: action.payload,
      };
    case VIEW_SUBSCRIBED_PACKAGE_FOR_FAMILY_MEMBER_DATA_FAILURE:
      return { ...state, errors: action.payload };
    case "CLEAR_SUBSCRIBED_PACKAGES":
      // Clear the subscribed packages data
      return {
        ...state,
        userViewSubscribedPackageForFamilyMember: [],
      };

    default:
      return state;
  }
};
