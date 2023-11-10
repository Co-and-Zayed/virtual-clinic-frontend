import {
    EDIT_PATIENT_SETTINGS_DATA_LOADING,
    EDIT_PATIENT_SETTINGS_DATA_SUCCESS,
    EDIT_PATIENT_SETTINGS_DATA_FAILURE,
  } from "redux/VirtualClinicRedux/types";
  
  const initialState = {
    editPatientSettingsLoading: false,
    editPatientSettings: null,
  };
  
  export const editPatientSettingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case EDIT_PATIENT_SETTINGS_DATA_LOADING:
        return { ...state, editPatientSettingsLoading: action.payload };
      case EDIT_PATIENT_SETTINGS_DATA_SUCCESS:
        return {
          ...state,
          editPatientSettings: action.payload,
        };
      case EDIT_PATIENT_SETTINGS_DATA_FAILURE:
        return { ...state, errors: action.payload };
      default:
        return state;
    }
  };
  