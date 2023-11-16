import * as Routes from "VirtualClinic/Routes/VirtualClinicRoutes/paths";
import {
  AppointmentsIcon,
  DashboardIcon,
  DoctorsIcon,
  FamilyIcon,
  HealthIcon,
  LockIcon,
  PrescriptionsIcon,
  ProfileIcon,
  MedicalIcon,
  VideoIcon,
} from "VirtualClinic/assets/IconComponents";
import PatientProfileScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/ProfileScreen/ProfileScreen";
import PatientPasswordScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/PasswordScreen/PasswordScreen";
import MedicalScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/MedicalScreen/MedicalScreen";

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
    route: Routes.MY_PACKAGE_PATH,
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
  {
    name: "Video Call",
    route: Routes.VIDEO_CALL_PATH,
    icon: <VideoIcon />,
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
  {
    name: "Health",
    route: Routes.SETTINGS_PATH + Routes.MEDICAL_HISTORY_PATH,
    sub_page: <MedicalScreen />,
    icon: <MedicalIcon />,
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

export const pendingNavLinksDoctor = [
  {
    name: "Dashboard",
    route: Routes.DASHBOARD_PATH,
    icon: <DashboardIcon />,
  },
];
