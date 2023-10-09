import {
    ALL_SPECILATIES_LOADING,
    ALL_SPECILATIES_SUCCESS,
    ALL_SPECILATIES_FAILURE,
  } from "redux/VirtualClinicRedux/types";
  
  const initialState = {
    specialitiesLoading: false,
    allSpecialities: [],
  };
  
  export const allSpecialitiesReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case ALL_SPECILATIES_LOADING:
        return { ...state, usersLoading: action.payload };
      case ALL_SPECILATIES_SUCCESS:
        return {
          ...state,
          allSpecialities: action.payload,
        };
      case ALL_SPECILATIES_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  