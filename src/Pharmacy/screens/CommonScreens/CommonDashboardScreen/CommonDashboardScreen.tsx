import styles from "Pharmacy/screens/CommonScreens/CommonDashboardScreen/CommonDashboardScreen.module.css";
import { useNav } from "Pharmacy/hooks/useNav";
import { useEffect, useState } from "react";
import PatientDashboardScreen from "Pharmacy/screens/User Screens/Patient Screens/DashboardScreen/DashboardScreen";
import PharmacistDashboardScreen from "Pharmacy/screens/User Screens/Pharmacist Screens/DashboardScreen/DashboardScreen";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useSelector } from "react-redux";
import AdminsScreen from "../../User Screens/Admin Screens/AdminsScreen/AdminsScreen";

const CommonDashboardScreen = () => {
  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  return userType === "PHARMACIST" ? (
    <PharmacistDashboardScreen />
  ) : userType === "PATIENT" ? (
    <PatientDashboardScreen />
  ) : userType === "ADMIN" ? (
    <AdminsScreen />
  ) : (
    <>User type not valid</>
  );
};

export default CommonDashboardScreen;
