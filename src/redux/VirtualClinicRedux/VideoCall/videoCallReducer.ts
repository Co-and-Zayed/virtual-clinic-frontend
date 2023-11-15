import {
  RTC_CONNECTION,
  LOCAL_STREAM,
  REMOTE_STREAM,
  CURRENT_CALL_ACTION,
} from "redux/VirtualClinicRedux/types";

const initialState = {
  pc: null,
  localStream: null,
  remoteStream: null,
  currentAction: "",
};

export const videoCallReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RTC_CONNECTION:
      return {
        ...state,
        pc: action.payload,
      };
    case LOCAL_STREAM:
      return {
        ...state,
        localStream: action.payload,
      };
    case REMOTE_STREAM:
      return {
        ...state,
        remoteStream: action.payload,
      };
    case CURRENT_CALL_ACTION:
      return {
        ...state,
        currentAction: action.payload,
      };
    default:
      return state;
  }
};
