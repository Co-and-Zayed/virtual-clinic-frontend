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
    name: "Appointments",
    route: Routes.APPOINTMENTS_PATH,
  },
  {
    name: "Family Members",
    route: Routes.FAMILYMEMBERS_PATH,
}, {
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
  {
    name: "Appointments",
    route: Routes.APPOINTMENTS_PATH,
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
