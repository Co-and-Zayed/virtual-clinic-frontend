import styles from "screens/VirtualClinicScreens/CommonScreens/CommonAppointmentsScreen/CommonAppointmentsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import PatientAppointmentsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/AppointmentsScreen/AppointmentsScreen";
import DoctorAppointmentsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/AppointmentsScreen/AppointmentsScreen";

const CommonAppointmentsScreen = () => {
  var currentUser = process.env.REACT_APP_CURRENT_USER;

  useEffect(() => {
    console.log(currentUser);
  }, []);

  return currentUser === "Doctor" ? (
    <DoctorAppointmentsScreen />
  ) : (
    <PatientAppointmentsScreen />
  );
};

export default CommonAppointmentsScreen;
