import * as Routes from "Routes/VirtualClinicRoutes/paths";

import ProtectedRoutes from "Routes/ProtectedRoutes";

import HomeScreen from "screens/VirtualClinicScreens/HomeScreen/HomeScreen";
import LoginScreen from "screens/VirtualClinicScreens/LoginScreen/LoginScreen";
import CommonDashboardScreen from "screens/VirtualClinicScreens/CommonScreens/CommonDashboardScreen/CommonDashboardScreen";
import CommonSettingsScreen from "screens/VirtualClinicScreens/CommonScreens/CommonSettingsScreen/CommonSettingsScreen";

import PatientDoctorsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen";
import PrescriptionsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/PrescriptionsScreen/PrescriptionsScreen";
import DoctorPatientsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen";

import PrescriptionDetailsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/PrescriptionsScreen/PrescriptionDetailsScreen";

import AdminDoctorsScreen from "screens/VirtualClinicScreens/User Screens/Admin Screens/DoctorsScreen/DoctorsScreen";
import AdminPatientsScreen from "screens/VirtualClinicScreens/User Screens/Admin Screens/PatientsScreen/PatientsScreen";
import AdminPackagesScreen from "screens/VirtualClinicScreens/User Screens/Admin Screens/PackagesScreen/PackagesScreen";
import AdminAdminsScreen from "screens/VirtualClinicScreens/User Screens/Admin Screens/AdminsScreen/AdminsScreen";

import RegisterScreen from "screens/VirtualClinicScreens/RegisterScreens/RegisterScreen";

export const routes = [
  {
    path: Routes.HOME_PATH,
    element: <HomeScreen />,
  },
  {
    path: Routes.LOGIN_PATH,
    element: <LoginScreen />,
  },
  {
    path: Routes.DASHBOARD_PATH,
    element: <CommonDashboardScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.PATIENTS_PATH,
    element: <DoctorPatientsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.DOCTORS_PATH,
    element: <PatientDoctorsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.SETTINGS_PATH,
    element: <CommonSettingsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.PRESCRIPTIONS_PATH,
    element: <PrescriptionsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.PRESCRIPTION_DETAILS_PATH,
    element: <PrescriptionDetailsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.ADMINS_PATH,
    element: <AdminAdminsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.PACKAGES_PATH,
    element: <AdminPackagesScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.VIEW_DOCTORS_PATH,
    element: <AdminDoctorsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.VIEW_PATIENTS_PATH,
    element: <AdminPatientsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.REGISTER_PATH,
    element: <RegisterScreen />,
  },
];
