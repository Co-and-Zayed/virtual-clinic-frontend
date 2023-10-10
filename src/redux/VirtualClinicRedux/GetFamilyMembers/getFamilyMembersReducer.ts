import {
    GET_FAMILYMEMBERS_DATA_FAILURE,
    GET_FAMILYMEMBERS_DATA_LOADING,
    GET_FAMILYMEMBERS_DATA_SUCCESS,
  } from "redux/VirtualClinicRedux/types";
  
  const initialState = {
    familyMembersLoading: false,
    userFamilyMembers: null,
  };
  
  export const getFamilyMembersReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case GET_FAMILYMEMBERS_DATA_LOADING:
        return { ...state, familyMembersLoading: action.payload };
      case GET_FAMILYMEMBERS_DATA_SUCCESS:
        return {
          ...state,
          userFamilyMembers: action.payload,
        };
      case GET_FAMILYMEMBERS_DATA_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  