import styles from "screens/VirtualClinicScreens/CommonScreens/CommonPackagesScreen/CommonPackagesScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { RootState } from "~/redux/rootReducer";
import { useSelector } from "react-redux";
import AdminPackagesScreen from "../../User Screens/Admin Screens/PackagesScreen/PackagesScreen";
import PatientPackagesScreen from "../../User Screens/Patient Screens/PackagesScreen/PackagesScreen";
const CommonPackagesScreen = () => {
  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  return userType === "PATIENT" ? (
    <PatientPackagesScreen />
  ) : userType === "ADMIN" ? (
    <AdminPackagesScreen />
  ) : (
    <>User type not valid</>
  );
};

export default CommonPackagesScreen;
