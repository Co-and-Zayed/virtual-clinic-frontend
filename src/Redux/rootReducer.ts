import { combineReducers } from "redux";
import { listAllUsersReducer } from "./VirtualClinicRedux/ListAllUsers/listAllUsersReducer";

import { listAllPatientsReducer } from "./VirtualClinicRedux/ListAllPatients/listAllPatientsReducer";
import { listPatientInfoReducer } from "./VirtualClinicRedux/ListPatientInfo/listPatientInfoReducer";

export const appReducer = combineReducers({
  listAllUsersReducer, listAllPatientsReducer, listPatientInfoReducer
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
