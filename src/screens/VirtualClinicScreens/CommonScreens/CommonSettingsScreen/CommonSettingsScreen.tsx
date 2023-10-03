import styles from "screens/VirtualClinicScreens/CommonScreens/CommonSettingsScreen/CommonSettingsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import PatientSettingsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/SettingsScreen";
import DoctorSettingsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/SettingsScreen/SettingsScreen";

const CommonSettingsScreen = () => {
  var currentUser = process.env.REACT_APP_CURRENT_USER;

  useEffect(() => {
    console.log(currentUser);
  }, []);

  return currentUser === "Doctor" ? (
    <DoctorSettingsScreen />
  ) : (
    <PatientSettingsScreen />
  );
};

export default CommonSettingsScreen;
