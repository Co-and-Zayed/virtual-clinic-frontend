import * as Routes from "Routes/VirtualClinicRoutes/paths";
import ProtectedRoutes from "Routes/ProtectedRoutes";
import HomeScreen from "screens/VirtualClinicScreens/HomeScreen/HomeScreen";
import LoginScreen from "screens/VirtualClinicScreens/LoginScreen/LoginScreen";
import CommonDashboardScreen from "screens/VirtualClinicScreens/CommonScreens/CommonDashboardScreen/CommonDashboardScreen";
import CommonSettingsScreen from "screens/VirtualClinicScreens/CommonScreens/CommonSettingsScreen/CommonSettingsScreen";
import PatientDoctorsScreen from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen";
import DoctorPatientsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen";
import DoctorPatientInfoScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientInfoScreen";
import DoctorUpcomingPatientsScreen from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/UpcomingPatientsScreen";

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
];
