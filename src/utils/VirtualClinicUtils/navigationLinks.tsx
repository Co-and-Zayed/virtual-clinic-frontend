import * as Routes from "Routes/VirtualClinicRoutes/paths";
import {
  AppointmentsIcon,
  DashboardIcon,
  DoctorsIcon,
  FamilyIcon,
  HealthIcon,
  LockIcon,
  PrescriptionsIcon,
  ProfileIcon,
} from "assets/IconComponents";
import PatientProfileScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/ProfileScreen/ProfileScreen";
import PatientPasswordScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/PasswordScreen/PasswordScreen";

export const navLinksPatient = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
    icon: <DashboardIcon />,
  },
  {
    name: "Doctors",
    route: Routes.DOCTORS_PATH,
    icon: <DoctorsIcon />,
  },
  {
    name: "Appointments",
    route: Routes.APPOINTMENTS_PATH,
    icon: <AppointmentsIcon />,
  },
  {
    name: "Health Packages",
    route: Routes.PACKAGES_PATH,
    icon: <HealthIcon />,
  },
  {
    name: "Family Members",
    route: Routes.FAMILYMEMBERS_PATH,
    icon: <FamilyIcon />,
  },
  {
    name: "Prescriptions",
    route: Routes.PRESCRIPTIONS_PATH,
    icon: <PrescriptionsIcon />,
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

export const settingsDoctor = [
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

export const navLinksDoctor = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
    icon: <DashboardIcon />,
  },
  {
    name: "Patients",
    route: Routes.PATIENTS_PATH,
    icon: <DoctorsIcon />,
  },
  {
    name: "Appointments",
    route: Routes.APPOINTMENTS_PATH,
    icon: <AppointmentsIcon />,
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
