import { combineReducers } from "redux";
import { getDoctorInfoReducer } from "./VirtualClinicRedux/GetDoctorInfo/getDoctorInfoReducer";

export const appReducer = combineReducers({
  getDoctorInfoReducer,
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
