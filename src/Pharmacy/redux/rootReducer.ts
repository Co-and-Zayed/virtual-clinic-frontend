import { combineReducers } from "redux";

import { listAllUsersReducer } from "./PharmacyRedux/ListAllUsers/listAllUsersReducer";
import { allSpecialitiesReducer } from "./PharmacyRedux/Dropdowns/AllSpecialities/allSpecialitiesReducer";

import { listAllAdminsReducer } from "./PharmacyRedux/ListAllAdmins/listAllAdminsReducer";
import { createAdminReducer } from "./PharmacyRedux/CreateAdmin/createAdminReducer";
import { adminListAllPatientsReducer } from "./PharmacyRedux/AdminListAllPatients/adminListAllPatientsReducer";
import { userReducer } from "Pharmacy/redux/User/userReducer";
import { registerReducer } from "Pharmacy/redux/Register/registerReducer";
import { logoutReducer } from "Pharmacy/redux/Logout/logoutReducer";
import { listAllMedicinesReducer } from "./PharmacyRedux/ListAllMedicines/listAllMedicinesReducer";
import { allMedicinalUsesReducer } from "./PharmacyRedux/Dropdowns/AllMedicinalUses/allMedicinalUsesReducer";
import { adminListAllPharmacistsReducer } from "./PharmacyRedux/AdminListAllPharmacists/adminListAllPharmacistsReducer";
import { patientCartReducer } from "./PharmacyRedux/PatientCart/patientCartReducer";
import { ordersReducer } from "./PharmacyRedux/ListAllOrders/ordersReducer";
import { listAllContractsReducer } from "./PharmacyRedux/ListAllContracts/listAllContractsReducer";
import { forgetPasswordReducer } from "Pharmacy/redux/ForgetPassword/forgetPasswordReducer";
import { verifyOtpReducer } from "Pharmacy/redux/ForgetPassword/VerifyOtp/verifyOtpReducer";
import { resetPasswordReducer } from "Pharmacy/redux/ForgetPassword/ResetPassword/resetPasswordReducer";

export const appReducer = combineReducers({
  listAllUsersReducer,
  allSpecialitiesReducer,
  listAllAdminsReducer,
  createAdminReducer,
  adminListAllPatientsReducer,
  adminListAllPharmacistsReducer,
  userReducer,
  registerReducer,
  logoutReducer,
  listAllMedicinesReducer,
  allMedicinalUsesReducer,
  patientCartReducer,
  ordersReducer,
  listAllContractsReducer,
  forgetPasswordReducer,
  verifyOtpReducer,
  resetPasswordReducer,
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;
