import styles from "VirtualClinic/screens/VirtualClinicScreens/CommonScreens/CommonAppointmentsScreen/CommonAppointmentsScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState } from "react";

import PatientAppointmentsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/AppointmentsScreen/AppointmentsScreen";
import DoctorAppointmentsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Doctor Screens/AppointmentsScreen/AppointmentsScreen";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useSelector } from "react-redux";

const CommonAppointmentsScreen = () => {
  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  return userType === "DOCTOR" ? (
    <DoctorAppointmentsScreen />
  ) : (
    <PatientAppointmentsScreen />
  );
};

export default CommonAppointmentsScreen;
