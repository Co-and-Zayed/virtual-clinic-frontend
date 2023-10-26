import * as Routes from "Routes/VirtualClinicRoutes/paths";
import {
  AppointmentsIcon,
  DashboardIcon,
  DoctorsIcon,
  FamilyIcon,
  HealthIcon,
  PrescriptionsIcon,
} from "assets/IconComponents";

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
