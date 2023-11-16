import { FETCH_ORDERS, CANCEL_ORDER } from "Pharmacy/redux/PharmacyRedux/types";

const INITIAL_STATE = {
  orders: [],
  loading: false,
  error: null,
};

export const ordersReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        orders: action.payload,
        loading: false,
        error: null,
      };
    case CANCEL_ORDER:
      return {
        ...state,
        //update the order status
        orders: state.orders.map((order: any) => {
          if (order._id === action.payload._id) {
            return action.payload;
          }
          return order;
        }),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
