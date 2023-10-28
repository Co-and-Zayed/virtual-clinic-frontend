import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DashboardScreen/DashboardScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const DashboardScreen = () => {
  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1 className="pageHeading">Dashboard</h1>
    </div>
  );
};

export default DashboardScreen;
