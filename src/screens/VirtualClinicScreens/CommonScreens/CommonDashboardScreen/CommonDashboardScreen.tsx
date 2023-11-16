import styles from "screens/VirtualClinicScreens/CommonScreens/CommonDashboardScreen/CommonDashboardScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState } from "react";
import PatientDashboardScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/DashboardScreen/DashboardScreen";
import DoctorDashboardScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/DashboardScreen/DashboardScreen";
import { RootState } from "redux/rootReducer";
import { useSelector } from "react-redux";
import AdminsScreen from "../../User Screens/Admin Screens/AdminsScreen/AdminsScreen";

const CommonDashboardScreen = () => {
  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  return userType === "DOCTOR" ? (
    <DoctorDashboardScreen />
  ) : userType === "PATIENT" ? (
    <PatientDashboardScreen />
  ) : userType === "ADMIN" ? (
    <AdminsScreen />
  ) : (
    <>User type not valid</>
  );
};

export default CommonDashboardScreen;
