import { combineReducers } from "redux";

import { listAllUsersReducer } from "./VirtualClinicRedux/ListAllUsers/listAllUsersReducer";
import { patientGetDoctorsReducer } from "./VirtualClinicRedux/PatientGetDoctors/patientGetDoctorsReducer";
import { patientSearchDoctorsReducer } from "./VirtualClinicRedux/PatientSearchDoctors/patientSearchDoctorsReducer";
import { allSpecialitiesReducer } from "./VirtualClinicRedux/Dropdowns/AllSpecialities/allSpecialitiesReducer";
import { getDoctorInfoReducer } from "./VirtualClinicRedux/GetDoctorInfo/getDoctorInfoReducer";

import { addFamilyMemberReducer } from "./VirtualClinicRedux/AddFamilyMember/addFamilyMemberReducer";
import { getFamilyMembersReducer } from "./VirtualClinicRedux/GetFamilyMembers/getFamilyMembersReducer";
import { createAppointmentReducer } from "./VirtualClinicRedux/CreateAppointment/createAppointmentReducer";
import { getAppointmentsReducer } from "./VirtualClinicRedux/GetAppointments/getAppointmentsReducer";
import { updateAppointmentReducer } from "./VirtualClinicRedux/UpdateAppointment/updateAppointmentReducer";
import { deleteAppointmentReducer } from "./VirtualClinicRedux/DeleteAppointment/deleteAppointmentReducer";

import { listAllPatientsReducer } from "./VirtualClinicRedux/ListAllPatients/listAllPatientsReducer";
import { listUpcomingPatientsReducer } from "./VirtualClinicRedux/ListUpcomingPatients/listUpcomingPatientsReducer";
import { listPatientInfoReducer } from "./VirtualClinicRedux/ListPatientInfo/listPatientInfoReducer";
import { listDoctorSettingsReducer } from "./VirtualClinicRedux/ListDoctorSettings/listDoctorSettingsReducer";
import { editSettingsReducer } from "./VirtualClinicRedux/EditSettings/editSettingsReducer";
import { listPatientByNameReducer } from "./VirtualClinicRedux/ListPatientByName/listPatientByNameReducer";

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
import { userReducer } from "redux/User/userReducer";
import { registerReducer } from "redux/Register/registerReducer";
import { logoutReducer } from "redux/Logout/logoutReducer";
import { getDoctorCardCoordsReducer } from "redux/VirtualClinicRedux/GetDoctorInfo/getDoctorCardCoordsReducer";
import { viewPackagesReducer } from "./VirtualClinicRedux/viewPackages/viewPackagesReducer";
import { unsubscribeFromPackageReducer } from "./VirtualClinicRedux/UnsubscribeFromPackage/unsubscribeFromPackageReducer";
import { viewSubscribedPackageForFamilyMemberReducer } from "./VirtualClinicRedux/ViewSubscribedPackageforFamilyMember/viewSubscribedPackageforFamilyMemberReducer";


export const appReducer = combineReducers({
  listAllUsersReducer,
  patientGetDoctorsReducer,
  patientSearchDoctorsReducer,
  allSpecialitiesReducer,
  getDoctorInfoReducer,
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
  userReducer,
  registerReducer,
  createAppointmentReducer,
  addFamilyMemberReducer,
  getFamilyMembersReducer,
  getAppointmentsReducer,
  updateAppointmentReducer,
  deleteAppointmentReducer,
  listAllPatientsReducer,
  listUpcomingPatientsReducer,
  listPatientInfoReducer,
  listDoctorSettingsReducer,
  editSettingsReducer,
  listPatientByNameReducer,
  logoutReducer,
  getDoctorCardCoordsReducer,
  viewPackagesReducer,
  unsubscribeFromPackageReducer,
  viewSubscribedPackageForFamilyMemberReducer
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
