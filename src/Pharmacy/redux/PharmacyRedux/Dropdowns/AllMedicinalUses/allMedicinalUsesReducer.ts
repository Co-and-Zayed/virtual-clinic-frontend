import {
  ALL_MEDICINAL_USES_LOADING,
  ALL_MEDICINAL_USES_SUCCESS,
  ALL_MEDICINAL_USES_FAILURE,
} from "Pharmacy/redux/PharmacyRedux/types";

const initialState = {
  medicinalUsesLoading: false,
  allMedicinalUses: [],
};

export const allMedicinalUsesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ALL_MEDICINAL_USES_LOADING:
      return { ...state, medicinalUsesLoading: action.payload };
    case ALL_MEDICINAL_USES_SUCCESS:
      return {
        ...state,
        allMedicinalUses: action.payload,
      };
    case ALL_MEDICINAL_USES_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
