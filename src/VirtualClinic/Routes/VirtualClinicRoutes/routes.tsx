import * as Routes from "VirtualClinic/Routes/VirtualClinicRoutes/paths";
import ProtectedRoutes from "VirtualClinic/Routes/ProtectedRoutes";
import HomeScreen from "VirtualClinic/screens/VirtualClinicScreens/HomeScreen/HomeScreen";
import LoginScreen from "VirtualClinic/screens/VirtualClinicScreens/LoginScreen/LoginScreen";
import CommonDashboardScreen from "VirtualClinic/screens/VirtualClinicScreens/CommonScreens/CommonDashboardScreen/CommonDashboardScreen";
import CommonSettingsScreen from "VirtualClinic/screens/VirtualClinicScreens/CommonScreens/CommonSettingsScreen/CommonSettingsScreen";
// NEVEEN SCREENS
import PatientDoctorsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen";
import PrescriptionsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/PrescriptionsScreen/PrescriptionsScreen";
import DoctorPatientsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen";

import DoctorPatientInfoScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientInfoScreen";
import DoctorUpcomingPatientsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/UpcomingPatientsScreen";

// MOSTAFA SCREENS
import CommonAppointmentsScreen from "VirtualClinic/screens/VirtualClinicScreens/CommonScreens/CommonAppointmentsScreen/CommonAppoitmentScreen";
import FamilyMembersScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/FamilyMembersScreen/FamilyMembersScreen";

import PrescriptionDetailsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/PrescriptionsScreen/PrescriptionDetailsScreen";

import AdminDoctorsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Admin Screens/DoctorsScreen/DoctorsScreen";
import AdminPatientsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Admin Screens/PatientsScreen/PatientsScreen";
import AdminPackagesScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Admin Screens/PackagesScreen/PackagesScreen";
import AdminAdminsScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Admin Screens/AdminsScreen/AdminsScreen";

import RegisterScreen from "VirtualClinic/screens/VirtualClinicScreens/RegisterScreens/RegisterScreen";

import DoctorInfoScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorInfoScreen";
import LoginScreen2 from "VirtualClinic/screens/VirtualClinicScreens/LoginScreen/LoginScreen2";
import NotFoundScreen from "VirtualClinic/screens/VirtualClinicScreens/NotFoundScreen/NotFoundScreen";
import CommonPackagesScreen from "VirtualClinic/screens/VirtualClinicScreens/CommonScreens/CommonPackagesScreen/CommonPackagesScreen";
import ForgetPasswordScreen from "VirtualClinic/screens/VirtualClinicScreens/LoginScreen/ForgetPasswordScreen/ForgetPasswordScreen";
import ViewPackageScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/PackagesScreen/ViewPackageScreen";
import MyFamilyPackagesScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/PackagesScreen/MyFamilyPackagesScreen";
import FamilyMemberPackageScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/PackagesScreen/FamilyMemberPackageScreen";
import VideoCallScreen from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/VideoCallScreen/VideoCallScreen";

export const routes = [
  {
    path: "*",
    element: <NotFoundScreen />,
    parent: <ProtectedRoutes />,
    system: "",
  },
  {
    path: Routes.HOME_PATH,
    system: "/clinic",
    element: <HomeScreen />,
  },
  {
    path: Routes.LOGIN_PATH,
    // element: <LoginScreen />,
    system: "/clinic",
    element: <LoginScreen2 />,
  },
  {
    path: Routes.DASHBOARD_PATH,
    element: <CommonDashboardScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.PATIENTS_PATH,
    element: <DoctorPatientsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.VIDEO_CALL_PATH,
    element: <VideoCallScreen />,
    system: "/clinic",
    // parent: <ProtectedRoutes />,
  },
  {
    path: Routes.DOCTORS_UPCOMING_PATIENTS_PATH,
    element: <DoctorUpcomingPatientsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.DOCTORS_PATIENT_INFO_PATH,
    element: <DoctorPatientInfoScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.DOCTORS_PATH,
    element: <PatientDoctorsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.SETTINGS_PATH,
    element: <CommonSettingsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.SETTINGS_PATH + Routes.PROFILE_PATH,
    system: "/clinic",
    element: <CommonSettingsScreen />,
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.SETTINGS_PATH + Routes.PASSWORD_PATH,
    element: <CommonSettingsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.SETTINGS_PATH + Routes.MEDICAL_HISTORY_PATH,
    element: <CommonSettingsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.APPOINTMENTS_PATH,
    element: <CommonAppointmentsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.FAMILYMEMBERS_PATH,
    element: <FamilyMembersScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.PRESCRIPTIONS_PATH,
    element: <PrescriptionsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.PRESCRIPTION_DETAILS_PATH,
    element: <PrescriptionDetailsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.ADMINS_PATH,
    element: <AdminAdminsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.PACKAGES_PATH,
    element: <CommonPackagesScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.MY_PACKAGE_PATH,
    element: <ViewPackageScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.MY_FAMILY_PACKAGES_PATH,
    element: <MyFamilyPackagesScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.FAMILY_MEMBER_PACKAGE_PATH,
    element: <FamilyMemberPackageScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.VIEW_DOCTORS_PATH,
    element: <AdminDoctorsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.VIEW_PATIENTS_PATH,
    element: <AdminPatientsScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.DOCTOR_INFO,
    element: <DoctorInfoScreen />,
    system: "/clinic",
    parent: <ProtectedRoutes />,
  },
  {
    path: Routes.REGISTER_PATH,
    system: "/clinic",
    element: <RegisterScreen />,
  },
  {
    path: Routes.RESET_PASSWORD,
    system: "/clinic",
    element: <ForgetPasswordScreen />,
  },
];
