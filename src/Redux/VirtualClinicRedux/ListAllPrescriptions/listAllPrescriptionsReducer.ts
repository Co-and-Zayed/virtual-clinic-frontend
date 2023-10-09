import {
  PRESCRIPTIONS_DATA_LOADING,
  PRESCRIPTIONS_DATA_SUCCESS,
  PRESCRIPTIONS_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  prescriptionsLoading: false,
  prescriptions: null,
};

export const listAllPrescriptionsReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case PRESCRIPTIONS_DATA_LOADING:
      return { ...state, prescriptionsLoading: action.payload };
    case PRESCRIPTIONS_DATA_SUCCESS:
      return {
        ...state,
        prescriptions: action.payload,
      };
    case PRESCRIPTIONS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
