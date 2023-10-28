import {
  SET_DOCTOR_CARD_COORDS,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  x: null,
  y: null,
};

export const getDoctorCardCoordsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DOCTOR_CARD_COORDS:
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y,
      };
    default:
      return state;
  }
};
