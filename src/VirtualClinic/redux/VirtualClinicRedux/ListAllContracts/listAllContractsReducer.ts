import {
  GET_CONTRACTS_DATA_LOADING,
  GET_CONTRACTS_DATA_SUCCESS,
  GET_CONTRACTS_DATA_FAILURE,
} from "VirtualClinic/redux/VirtualClinicRedux/types";

const initialState = {
  contractsLoading: false,
  allContracts: null,
};

export const listAllContractsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CONTRACTS_DATA_LOADING:
      return { ...state, contractsLoading: action.payload };
    case GET_CONTRACTS_DATA_SUCCESS:
      return {
        ...state,
        allContracts: action.payload,
      };
    case GET_CONTRACTS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
