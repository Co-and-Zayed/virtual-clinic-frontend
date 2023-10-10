import {
  EDIT_DOCTOR_SETTINGS_DATA_LOADING,
  EDIT_DOCTOR_SETTINGS_DATA_SUCCESS,
  EDIT_DOCTOR_SETTINGS_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  editSettingsLoading: false,
  editSettings: null,
};

export const editSettingsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case EDIT_DOCTOR_SETTINGS_DATA_LOADING:
      return { ...state, editSettingsLoading: action.payload };
    case EDIT_DOCTOR_SETTINGS_DATA_SUCCESS:
      return {
        ...state,
        editSettings: action.payload,
      };
    case EDIT_DOCTOR_SETTINGS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
