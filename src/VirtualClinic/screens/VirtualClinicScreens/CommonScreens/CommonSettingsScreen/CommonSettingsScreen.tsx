import styles from "VirtualClinic/screens/VirtualClinicScreens/CommonScreens/CommonSettingsScreen/CommonSettingsScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState } from "react";

import PatientSettingsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/SettingsScreen";
import DoctorSettingsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Doctor Screens/SettingsScreen/SettingsScreen";
import { useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";

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
