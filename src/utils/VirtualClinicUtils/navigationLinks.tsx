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
  {
    name: "Prescriptions",
    route: Routes.PRESCRIPTIONS_PATH,
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
