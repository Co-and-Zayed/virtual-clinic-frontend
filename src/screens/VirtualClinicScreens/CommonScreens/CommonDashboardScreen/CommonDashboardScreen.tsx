import styles from "screens/VirtualClinicScreens/CommonScreens/CommonDashboardScreen/CommonDashboardScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import PatientDashboardScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/DashboardScreen/DashboardScreen";
import DoctorDashboardScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/DashboardScreen/DashboardScreen";

const CommonDashboardScreen = () => {
  var currentUser = process.env.REACT_APP_CURRENT_USER;

  useEffect(() => {
    console.log(currentUser);
  }, []);

  return currentUser === "Doctor" ? (
    <DoctorDashboardScreen />
  ) : (
    <PatientDashboardScreen />
  );
};

export default CommonDashboardScreen;
