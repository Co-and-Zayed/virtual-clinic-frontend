import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DashboardScreen/DashboardScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import JSZip from "jszip";
import { access } from "fs";
import { useFunctions } from "hooks/useFunctions";

const DashboardScreen = () => {
  const { userData } = useSelector((state: RootState) => state.userReducer);
  useEffect(() => {
    console.log("USER DATAAA DASHBOARD");
    console.log(userData);
  }, []);

  const { handleDownload } = useFunctions();

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1 className="pageHeading">Dashboard</h1>
      <a onClick={() => handleDownload({ files: userData?.healthRecords })}>
        Download All Health Records
      </a>
      <a onClick={() => handleDownload({ file: userData?.healthRecords[1] })}>
        Download First Health Record
      </a>
    </div>
  );
};

export default DashboardScreen;
