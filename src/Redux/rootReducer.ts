import { combineReducers } from "redux";

import { listAllUsersReducer } from "./VirtualClinicRedux/ListAllUsers/listAllUsersReducer";
import { listAllPrescriptionsReducer } from "./VirtualClinicRedux/ListAllPrescriptions/listAllPrescriptionsReducer";
import { listSinglePrescriptionReducer } from "./VirtualClinicRedux/ListSinglePrescription/listSinglePrescriptionReducer";
import { listAllPackagesReducer } from "./VirtualClinicRedux/ListAllPackages/listAllPackagesReducer";
import { listAllAdminsReducer } from "./VirtualClinicRedux/ListAllAdmins/listAllAdminsReducer";
import { createAdminReducer } from "./VirtualClinicRedux/CreateAdmin/createAdminReducer";
import { adminListAllDoctorsReducer } from "./VirtualClinicRedux/AdminListAllDoctors/adminListAllDoctorsReducer";
import { adminListAllPatientsReducer } from "./VirtualClinicRedux/AdminListAllPatients/adminListAllPatientsReducer";
import { createPackageReducer } from "./VirtualClinicRedux/CreatePackage/createPackageReducer";
import { updatePackageReducer } from "./VirtualClinicRedux/UpdatePackage/updatePackageReducer";
import { deletePackageReducer } from "./VirtualClinicRedux/DeletePackage/deletePackageReducer";
import { loginReducer } from "redux/Login/loginReducer";
import { registerReducer } from "redux/Register/registerReducer";

export const appReducer = combineReducers({
  listAllUsersReducer,
  listAllPrescriptionsReducer,
  listSinglePrescriptionReducer,
  listAllPackagesReducer,
  listAllAdminsReducer,
  createAdminReducer,
  adminListAllDoctorsReducer,
  adminListAllPatientsReducer,
  createPackageReducer,
  updatePackageReducer,
  deletePackageReducer,
  loginReducer,
  registerReducer,
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
