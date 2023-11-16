import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/ProfileScreen/ProfileScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState } from "react";
import { settingsPatient } from "VirtualClinic/utils/navigationLinks";
import * as Routes from "VirtualClinic/Routes/VirtualClinicRoutes/paths";

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
