import {
  USERS_DATA_LOADING,
  USERS_DATA_SUCCESS,
  USERS_DATA_FAILURE,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  usersLoading: false,
  allUsers: null,
};

export const listAllUsersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USERS_DATA_LOADING:
      return { ...state, usersLoading: action.payload };
    case USERS_DATA_SUCCESS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case USERS_DATA_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
