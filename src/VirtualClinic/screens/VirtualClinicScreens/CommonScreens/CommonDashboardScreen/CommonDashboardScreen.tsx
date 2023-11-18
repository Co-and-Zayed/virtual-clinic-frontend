import styles from "VirtualClinic/screens/VirtualClinicScreens/CommonScreens/CommonDashboardScreen/CommonDashboardScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import PatientDashboardScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/DashboardScreen/DashboardScreen";
import DoctorDashboardScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Doctor Screens/DashboardScreen/DashboardScreen";
import { RootState } from "VirtualClinic/redux/rootReducer";
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
