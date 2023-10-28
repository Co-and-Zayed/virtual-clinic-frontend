import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/ProfileScreen/ProfileScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { settingsPatient } from "utils/VirtualClinicUtils/navigationLinks";
import * as Routes from "Routes/VirtualClinicRoutes/paths";

const ProfileScreen = () => {
  return (
    <>
      <div className={`${styles.settingsSection}`}>
        <h2 className={`${styles.subHeading}`}>My Profile</h2>
        <div className={`${styles.divider}`}></div>
        <div>balabizo</div>
      </div>
    </>
  );
};

export default ProfileScreen;
