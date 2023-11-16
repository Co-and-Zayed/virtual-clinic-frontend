import {
  ADD_FAMILYMEMBER_DATA_FAILURE,
  ADD_FAMILYMEMBER_DATA_LOADING,
  ADD_FAMILYMEMBER_DATA_SUCCESS,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  addingFamMemLoading: false,
  confirm: null,
};

export const addFamilyMemberReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_FAMILYMEMBER_DATA_LOADING:
      return { ...state, addingFamMemLoading: action.payload };
    case ADD_FAMILYMEMBER_DATA_SUCCESS:
      return {
        ...state,
        confirm: action.payload,
      };
    case ADD_FAMILYMEMBER_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
