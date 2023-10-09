import styles from "screens/VirtualClinicScreens/CommonScreens/CommonSettingsScreen/CommonSettingsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import PatientSettingsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/SettingsScreen";
import DoctorSettingsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/SettingsScreen/SettingsScreen";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";

const CommonSettingsScreen = () => {
  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  return userType === "DOCTOR" ? (
    <DoctorSettingsScreen />
  ) : (
    <PatientSettingsScreen />
  );
};

export default CommonSettingsScreen;
