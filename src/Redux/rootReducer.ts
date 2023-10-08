import { combineReducers } from "redux";
import { listAllUsersReducer } from "./VirtualClinicRedux/ListAllUsers/listAllUsersReducer";
import { addFamilyMemberReducer } from "./VirtualClinicRedux/AddFamilyMember/addFamilyMemberReducer";
import { getFamilyMembersReducer } from "./VirtualClinicRedux/GetFamilyMembers/getFamilyMembersReducer";
import { createAppointmentReducer } from "./VirtualClinicRedux/CreateAppointment/createAppointmentReducer";
import { getAppointmentsReducer } from "./VirtualClinicRedux/GetAppointments/getAppointmentsReducer";
import { updateAppointmentReducer } from "./VirtualClinicRedux/UpdateAppointment/updateAppointmentReducer";
import { deleteAppointmentReducer } from "./VirtualClinicRedux/DeleteAppointment/deleteAppointmentReducer";

export const appReducer = combineReducers({
  listAllUsersReducer,
  createAppointmentReducer,
  addFamilyMemberReducer,
  getFamilyMembersReducer,
  getAppointmentsReducer,
  updateAppointmentReducer,
  deleteAppointmentReducer,
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
