import PatientDashboardScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/DashboardScreen/DashboardScreen";
import PatientDoctorsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen";
import PatientSettingsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/SettingsScreen";
import PatientAppointmentsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/AppointmentsScreen/AppointmentsScreen";
import PatientFamilyMembersScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/FamilyMembersScreen/FamilyMembersScreen"

import DoctorDashboardScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/DashboardScreen/DashboardScreen";
import DoctorPatientsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen";
import DoctorSettingsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/SettingsScreen/SettingsScreen";
import DoctorAppointmentsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/AppointmentsScreen/AppointmentsScreen";


import * as Routes from "Routes/VirtualClinicRoutes/paths";

export const navLinksPatient = [
  {
    name: "Dashboard",
    screen: <PatientDashboardScreen />,
    route: Routes.DASHBOARD_PATH,
  },
  {
    name: "Doctors",
    screen: <PatientDoctorsScreen />,
    route: Routes.DOCTORS_PATH,
  },
  {
    name: "Settings",
    screen: <PatientSettingsScreen />,
    route: Routes.SETTINGS_PATH,
  },
  {
    name: "Appointments",
    screen: <PatientAppointmentsScreen />,
    route: Routes.APPOINTMENTS_PATH,
  },
  {
    name: "Family Members",
    screen: <PatientFamilyMembersScreen />,
    route: Routes.FAMILYMEMBERS_PATH,
  },
];

export const navLinksDoctor = [
  {
    name: "Dashboard",
    screen: <DoctorDashboardScreen />,
    route: Routes.DASHBOARD_PATH,
  },
  {
    name: "Patients",
    screen: <DoctorPatientsScreen />,
    route: Routes.PATIENTS_PATH,
  },
  {
    name: "Settings",
    screen: <DoctorSettingsScreen />,
    route: Routes.SETTINGS_PATH,
  },
  {
    name: "Appointments",
    screen: <DoctorAppointmentsScreen />,
    route: Routes.APPOINTMENTS_PATH,
  },
];
