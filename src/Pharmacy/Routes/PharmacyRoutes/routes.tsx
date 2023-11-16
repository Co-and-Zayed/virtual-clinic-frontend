import * as Routes from "Pharmacy/Routes/PharmacyRoutes/paths";
import ProtectedRoutes from "Pharmacy/Routes/ProtectedRoutes";
import HomeScreen from "Pharmacy/screens/HomeScreen/HomeScreen";
import LoginScreen from "Pharmacy/screens/LoginScreen/LoginScreen";
import CommonDashboardScreen from "Pharmacy/screens/CommonScreens/CommonDashboardScreen/CommonDashboardScreen";
import CommonSettingsScreen from "Pharmacy/screens/CommonScreens/CommonSettingsScreen/CommonSettingsScreen";
import CommonMedicineScreen from "Pharmacy/screens/CommonScreens/CommonMedicineScreen/CommonMedicineScreen";
import AdminAdminsScreen from "Pharmacy/screens/User Screens/Admin Screens/AdminsScreen/AdminsScreen";
import AdminPatientsScreen from "Pharmacy/screens/User Screens/Admin Screens/PatientsScreen/PatientsScreen";
import AdminPharmacistsScreen from "Pharmacy/screens/User Screens/Admin Screens/PharmacistsScreen/PharmacistsScreen";
import MedicineInfoScreen from "Pharmacy/screens/User Screens/Pharmacist Screens/MedicineInfoScreen/MedicineInfoScreen";
import NotFoundScreen from "Pharmacy/screens/NotFoundScreen/NotFoundScreen";
import BuyMedicineScreen from "Pharmacy/screens/User Screens/Patient Screens/MedicineScreen/BuyMedicineScreen";
import OrderScreen from "Pharmacy/screens/User Screens/Patient Screens/OrderScreen/OrderScreen";
import ForgotPassword from "Pharmacy/screens/ForgotPasswordScreen/ForgotPassword";

const system = "/pharmacy";
export const routes = [
  {
    path: "*",
    element: <NotFoundScreen />,
    parent: <ProtectedRoutes />,
    system: "",
  },
  {
    path: Routes.HOME_PATH,
    element: <HomeScreen />,
    system: system,
  },
  {
    path: Routes.LOGIN_PATH,
    element: <LoginScreen />,
    system: system,
  },
  {
    path: Routes.DASHBOARD_PATH,
    element: <CommonDashboardScreen />,
    parent: <ProtectedRoutes />,
    system: system,
  },
  {
    path: Routes.SETTINGS_PATH,
    element: <CommonSettingsScreen />,
    parent: <ProtectedRoutes />,
    system: system,
  },
  {
    path: Routes.SETTINGS_PATH + Routes.PROFILE_PATH,
    element: <CommonSettingsScreen />,
    parent: <ProtectedRoutes />,
    system: system,
  },
  {
    path: Routes.SETTINGS_PATH + Routes.PASSWORD_PATH,
    element: <CommonSettingsScreen />,
    parent: <ProtectedRoutes />,
    system: system,
  },
  {
    path: Routes.MEDICINE_PATH,
    element: <CommonMedicineScreen />,
    parent: <ProtectedRoutes />,
    system: system,
  },
  {
    path: Routes.BUY_MEDICINE_PATH,
    element: <BuyMedicineScreen />,
    parent: <ProtectedRoutes />,
    system: system,
  },
  // {
  //   path: Routes.MEDICINE_INFO_PATH,
  //   element: <MedicineInfoScreen />,
  //   parent: <ProtectedRoutes />,
  // },
  {
    path: Routes.ADMINS_PATH,
    element: <AdminAdminsScreen />,
    parent: <ProtectedRoutes />,
    system: system,
  },
  {
    path: Routes.VIEW_PHARMACISTS_PATH,
    element: <AdminPharmacistsScreen />,
    parent: <ProtectedRoutes />,
    system: system,
  },
  {
    path: Routes.VIEW_PATIENTS_PATH,
    element: <AdminPatientsScreen />,
    parent: <ProtectedRoutes />,
    system: system,
  },
  {
    path: Routes.ORDER_PATH,
    element: <OrderScreen />,
    parent: <ProtectedRoutes />,
    system: system,
  },
  {
    path: Routes.FORGOT_PASSWORD_PATH,
    element: <ForgotPassword />,
    system: system,
  },
];
