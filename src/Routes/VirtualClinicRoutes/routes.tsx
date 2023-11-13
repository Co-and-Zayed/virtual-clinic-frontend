import * as Routes from "Routes/VirtualClinicRoutes/paths";
import ProtectedRoutes from "Routes/ProtectedRoutes";
import HomeScreen from "screens/VirtualClinicScreens/HomeScreen/HomeScreen";
import LoginScreen from "screens/VirtualClinicScreens/LoginScreen/LoginScreen";
import CommonDashboardScreen from "screens/VirtualClinicScreens/CommonScreens/CommonDashboardScreen/CommonDashboardScreen";
import CommonSettingsScreen from "screens/VirtualClinicScreens/CommonScreens/CommonSettingsScreen/CommonSettingsScreen";
// NEVEEN SCREENS
import PatientDoctorsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen";
import PrescriptionsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/PrescriptionsScreen/PrescriptionsScreen";
import DoctorPatientsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen";

import DoctorPatientInfoScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientInfoScreen";
import DoctorUpcomingPatientsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/UpcomingPatientsScreen";

// MOSTAFA SCREENS
import CommonAppointmentsScreen from "screens/VirtualClinicScreens/CommonScreens/CommonAppointmentsScreen/CommonAppoitmentScreen";
import FamilyMembersScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/FamilyMembersScreen/FamilyMembersScreen";

import PrescriptionDetailsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/PrescriptionsScreen/PrescriptionDetailsScreen";

import AdminDoctorsScreen from "screens/VirtualClinicScreens/User Screens/Admin Screens/DoctorsScreen/DoctorsScreen";
import AdminPatientsScreen from "screens/VirtualClinicScreens/User Screens/Admin Screens/PatientsScreen/PatientsScreen";
import AdminPackagesScreen from "screens/VirtualClinicScreens/User Screens/Admin Screens/PackagesScreen/PackagesScreen";
import AdminAdminsScreen from "screens/VirtualClinicScreens/User Screens/Admin Screens/AdminsScreen/AdminsScreen";

import RegisterScreen from "screens/VirtualClinicScreens/RegisterScreens/RegisterScreen";

import DoctorInfoScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorInfoScreen";
import LoginScreen2 from "screens/VirtualClinicScreens/LoginScreen/LoginScreen2";
import NotFoundScreen from "screens/VirtualClinicScreens/NotFoundScreen/NotFoundScreen";
import CommonPackagesScreen from "screens/VirtualClinicScreens/CommonScreens/CommonPackagesScreen/CommonPackagesScreen";
import ViewPackageScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/PackagesScreen/ViewPackageScreen";
import MyFamilyPackagesScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/PackagesScreen/MyFamilyPackagesScreen";
import FamilyMemberPackageScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/PackagesScreen/FamilyMemberPackageScreen";
import PaymentMethod from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/PaymentScreens/PaymentMethod";

export const routes = [
  {
    path: "*",
    element: <NotFoundScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.HOME_PATH,
    element: <HomeScreen />,
  },
  {
    path: Routes.LOGIN_PATH,
    // element: <LoginScreen />,
    element: <LoginScreen2 />,
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
    path: Routes.DOCTORS_UPCOMING_PATIENTS_PATH,
    element: <DoctorUpcomingPatientsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.DOCTORS_PATIENT_INFO_PATH,
    element: <DoctorPatientInfoScreen />,
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
    path: Routes.SETTINGS_PATH + Routes.PROFILE_PATH,
    element: <CommonSettingsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.SETTINGS_PATH + Routes.PASSWORD_PATH,
    element: <CommonSettingsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.APPOINTMENTS_PATH,
    element: <CommonAppointmentsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.FAMILYMEMBERS_PATH,
    element: <FamilyMembersScreen />,
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
    element: <CommonPackagesScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.MY_PACKAGE_PATH,
    element: <ViewPackageScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.MY_FAMILY_PACKAGES_PATH ,
    element: <MyFamilyPackagesScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.FAMILY_MEMBER_PACKAGE_PATH ,
    element: <FamilyMemberPackageScreen />,
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
    path: Routes.DOCTOR_INFO,
    element: <DoctorInfoScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.REGISTER_PATH,
    element: <RegisterScreen />,
  },
];
