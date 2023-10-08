import { combineReducers } from "redux";
import { listAllUsersReducer } from "./VirtualClinicRedux/ListAllUsers/listAllUsersReducer";

import { listAllPatientsReducer } from "./VirtualClinicRedux/ListAllPatients/listAllPatientsReducer";
import { listUpcomingPatientsReducer } from "./VirtualClinicRedux/ListUpcomingPatients/listUpcomingPatientsReducer";
import { listPatientInfoReducer } from "./VirtualClinicRedux/ListPatientInfo/listPatientInfoReducer";
import { listPatientByNameReducer } from "./VirtualClinicRedux/ListPatientByName/listPatientByNameReducer";

export const appReducer = combineReducers({
  listAllUsersReducer, listAllPatientsReducer, listPatientInfoReducer, listPatientByNameReducer, listUpcomingPatientsReducer
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
