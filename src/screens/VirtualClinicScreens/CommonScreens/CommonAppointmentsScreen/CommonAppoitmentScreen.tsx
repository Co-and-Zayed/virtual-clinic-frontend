import styles from "screens/VirtualClinicScreens/CommonScreens/CommonAppointmentsScreen/CommonAppointmentsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import PatientAppointmentsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/AppointmentsScreen/AppointmentsScreen";
import DoctorAppointmentsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/AppointmentsScreen/AppointmentsScreen";
import { RootState } from "redux/rootReducer";
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
