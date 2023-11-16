import { GET_CART } from "Pharmacy/redux/PharmacyRedux/types";

const initialState = {
  shouldGetCart: false,
};

export const patientCartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CART:
      return { ...state, shouldGetCart: action.payload };
    default:
      return state;
  }
};
