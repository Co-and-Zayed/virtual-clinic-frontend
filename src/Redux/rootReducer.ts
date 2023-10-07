import { combineReducers } from "redux";

import { listAllUsersReducer } from "./VirtualClinicRedux/ListAllUsers/listAllUsersReducer";
import { listAllPrescriptionsReducer } from "./VirtualClinicRedux/ListAllPrescriptions/listAllPrescriptionsReducer";
import { listSinglePrescriptionReducer } from "./VirtualClinicRedux/ListSinglePrescription/listSinglePrescriptionReducer";


export const appReducer = combineReducers({
  listAllUsersReducer,
  listAllPrescriptionsReducer,
  listSinglePrescriptionReducer
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
