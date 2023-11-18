import styles from "Pharmacy/screens/PharmacyScreens/CommonScreens/CommonSettingsScreen/CommonSettingsScreen.module.css";
import { useNav } from "Pharmacy/hooks/useNav";
import { useEffect, useState } from "react";

// import PatientSettingsScreen from "Pharmacy/screens/PharmacyScreens/User Screens/Patient Screens/SettingsScreen/SettingsScreen";
// import PharmacistSettingsScreen from "Pharmacy/screens/PharmacyScreens/User Screens/Pharmacist Screens/SettingsScreen/SettingsScreen";
import { useSelector } from "react-redux";
import { RootState } from "Pharmacy/redux/rootReducer";
import PatientSettingsScreen from "Pharmacy/screens/User Screens/Patient Screens/SettingsScreen/SettingsScreen";
import PharmacistSettingsScreen from "Pharmacy/screens/User Screens/Pharmacist Screens/SettingsScreen/SettingsScreen";
// import PharmacistSettingsScreen from "Pharmacy/screens/PharmacyScreens/User Screens/Pharmacist Screens/SettingsScreen/SettingsScreen";

const CommonSettingsScreen = () => {
  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  return userType === "PHARMACIST" ? (
    <PharmacistSettingsScreen />
  ) : (
    <PatientSettingsScreen />
  );
};

export default CommonSettingsScreen;
