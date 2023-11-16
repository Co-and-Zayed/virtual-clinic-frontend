import * as Routes from "Pharmacy/Routes/PharmacyRoutes/paths";
import {
  AppointmentsIcon,
  DashboardIcon,
  DoctorsIcon,
  FamilyIcon,
  HealthIcon,
  LockIcon,
  PrescriptionsIcon,
  ProfileIcon,
} from "Pharmacy/assets/IconComponents";

import PatientPasswordScreen from "Pharmacy/screens/User Screens/Patient Screens/SettingsScreen/PasswordScreen/PasswordScreen";
import PatientProfileScreen from "Pharmacy/screens/User Screens/Patient Screens/SettingsScreen/ProfileScreen/ProfileScreen";

export const navLinksPatient = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
    icon: <DashboardIcon />,
  },
  {
    name: "Medicine",
    route: Routes.MEDICINE_PATH,
    icon: <PrescriptionsIcon />,
  },
  {
    name: "Order",
    route: Routes.ORDER_PATH,
    icon: <AppointmentsIcon />,
  },
];

export const settingsPatient = [
  {
    name: "Profile",
    route: Routes.SETTINGS_PATH + Routes.PROFILE_PATH,
    sub_page: <PatientProfileScreen />,
    icon: <ProfileIcon />,
  },
  {
    name: "Password",
    route: Routes.SETTINGS_PATH + Routes.PASSWORD_PATH,
    sub_page: <PatientPasswordScreen />,
    icon: <LockIcon />,
  },
];

export const settingsPharmacist = [
  {
    name: "Profile",
    route: Routes.SETTINGS_PATH + Routes.PROFILE_PATH,
    sub_page: <PatientProfileScreen />,
    icon: <ProfileIcon />,
  },
  {
    name: "Password",
    route: Routes.SETTINGS_PATH + Routes.PASSWORD_PATH,
    sub_page: <PatientPasswordScreen />,
    icon: <LockIcon />,
  },
];

export const settingsAdmin = [
  {
    name: "Profile",
    route: Routes.SETTINGS_PATH + Routes.PROFILE_PATH,
    sub_page: <PatientProfileScreen />,
    icon: <ProfileIcon />,
  },
  {
    name: "Password",
    route: Routes.SETTINGS_PATH + Routes.PASSWORD_PATH,
    sub_page: <PatientPasswordScreen />,
    icon: <LockIcon />,
  },
];

export const navLinksPharmacist = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
    icon: <DashboardIcon />,
  },
  {
    name: "Medicine",
    route: Routes.MEDICINE_PATH,
    icon: <PrescriptionsIcon />,
  },
];

export const navLinksAdmin = [
  {
    name: "Admins",
    route: Routes.ADMINS_PATH,
  },
  {
    name: "Pharmacists",
    route: Routes.VIEW_PHARMACISTS_PATH,
  },
  {
    name: "Patients",
    route: Routes.VIEW_PATIENTS_PATH,
  },
];

export const pendingNavLinksPharmacist = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
    icon: <DashboardIcon />,
  },
];
