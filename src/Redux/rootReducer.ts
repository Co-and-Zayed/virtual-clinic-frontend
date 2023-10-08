import { combineReducers } from "redux";
import { listAllUsersReducer } from "./VirtualClinicRedux/ListAllUsers/listAllUsersReducer";

import { listAllPatientsReducer } from "./VirtualClinicRedux/ListAllPatients/listAllPatientsReducer";
import { listPatientInfoReducer } from "./VirtualClinicRedux/ListPatientInfo/listPatientInfoReducer";
import { listDoctorSettingsReducer } from "./VirtualClinicRedux/ListDoctorSettings/listDoctorSettingsReducer";
import { editSettingsReducer } from "./VirtualClinicRedux/EditSettings/editSettingsReducer";


export const appReducer = combineReducers({
  listAllUsersReducer, listAllPatientsReducer, listPatientInfoReducer,listDoctorSettingsReducer,editSettingsReducer
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
