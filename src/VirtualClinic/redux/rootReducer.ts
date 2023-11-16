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
import { userReducer } from "VirtualClinic/redux/User/userReducer";
import { registerReducer } from "VirtualClinic/redux/Register/registerReducer";
import { logoutReducer } from "VirtualClinic/redux/Logout/logoutReducer";
import { getDoctorCardCoordsReducer } from "VirtualClinic/redux/VirtualClinicRedux/GetDoctorInfo/getDoctorCardCoordsReducer";

import { forgetPasswordReducer } from "VirtualClinic/redux/ForgetPassword/forgetPasswordReducer";
import { verifyOtpReducer } from "VirtualClinic/redux/ForgetPassword/VerifyOtp/verifyOtpReducer";
import { resetPasswordReducer } from "VirtualClinic/redux/ForgetPassword/ResetPassword/resetPasswordReducer";

import { listAllContractsReducer } from "VirtualClinic/redux/VirtualClinicRedux/ListAllContracts/listAllContractsReducer";

import { viewPackagesReducer } from "./VirtualClinicRedux/viewPackages/viewPackagesReducer";
import { unsubscribeFromPackageReducer } from "./VirtualClinicRedux/UnsubscribeFromPackage/unsubscribeFromPackageReducer";
import { viewSubscribedPackageForFamilyMemberReducer } from "./VirtualClinicRedux/ViewSubscribedPackageforFamilyMember/viewSubscribedPackageforFamilyMemberReducer";
import { unsubscribeFromPackageForFamilyReducer } from "./VirtualClinicRedux/UnsubscribeFromPackageforFamily/unsubscribeFromPackageforFamilyReducer";
import { viewPackagePriceReducer } from "./VirtualClinicRedux/GetPackagePrice/getPackagePriceReducer";
import { listAllPatientHealthRecordsReducer } from "./VirtualClinicRedux/ListAllPatientHealthRecords/ListAllPatientHealthRecordsReducer";
import { videoCallReducer } from "./VirtualClinicRedux/VideoCall/videoCallReducer";

export const appReducer = combineReducers({
  videoCallReducer,
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
  forgetPasswordReducer,
  verifyOtpReducer,
  resetPasswordReducer,
  listAllContractsReducer,
  viewPackagesReducer,
  unsubscribeFromPackageReducer,
  viewSubscribedPackageForFamilyMemberReducer,
  unsubscribeFromPackageForFamilyReducer,
  viewPackagePriceReducer,
  listAllPatientHealthRecordsReducer,
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
