import {
  DOCTOR_SETTINGS_DATA_LOADING,
  DOCTOR_SETTINGS_DATA_SUCCESS,
  DOCTOR_SETTINGS_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  doctorSettingsLoading: false,
  doctorSettings: null,
};

export const listDoctorSettingsReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case DOCTOR_SETTINGS_DATA_LOADING:
      return { ...state, doctorSettingsLoading: action.payload };
    case DOCTOR_SETTINGS_DATA_SUCCESS:
      return {
        ...state,
        doctorSettings: action.payload,
      };
    case DOCTOR_SETTINGS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
