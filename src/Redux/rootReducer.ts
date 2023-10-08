import { combineReducers } from "redux";
import { listAllUsersReducer } from "./VirtualClinicRedux/ListAllUsers/listAllUsersReducer";
import { patientGetDoctorsReducer } from "./VirtualClinicRedux/PatientGetDoctors/patientGetDoctorsReducer";
import { patientSearchDoctorsReducer } from "./VirtualClinicRedux/PatientSearchDoctors/patientSearchDoctorsReducer";
import { allSpecialitiesReducer } from "./VirtualClinicRedux/Dropdowns/AllSpecialities/allSpecialitiesReducer";

export const appReducer = combineReducers({
  listAllUsersReducer,
  patientGetDoctorsReducer,
  patientSearchDoctorsReducer,
  allSpecialitiesReducer,
});



export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
