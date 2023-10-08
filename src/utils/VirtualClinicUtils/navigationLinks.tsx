import PatientDashboardScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/DashboardScreen/DashboardScreen";
import PatientDoctorsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen";
import PatientSettingsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/SettingsScreen";

import DoctorDashboardScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/DashboardScreen/DashboardScreen";
import DoctorPatientsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen";
import DoctorSettingsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/SettingsScreen/SettingsScreen";

import * as Routes from "Routes/VirtualClinicRoutes/paths";

export const navLinksPatient = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
  },
  {
    name: "Doctors",
    route: Routes.DOCTORS_PATH,
  },
  {
    name: "Settings",
    route: Routes.SETTINGS_PATH,
  },
];

export const navLinksDoctor = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
  },
  {
    name: "Patients",
    route: Routes.PATIENTS_PATH,
  },
  {
    name: "Settings",
    route: Routes.SETTINGS_PATH,
  },
];

export const navLinksAdmin = [
  {
    name: "Admins",
    route: Routes.ADMINS_PATH,
  },
  {
    name: "Packages",
    route: Routes.PACKAGES_PATH,
  },
  {
    name: "Doctors",
    route: Routes.VIEW_DOCTORS_PATH,
  },
  {
    name: "Patients",
    route: Routes.VIEW_PATIENTS_PATH,
  },
];
