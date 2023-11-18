import styles from "Pharmacy/screens/User Screens/Patient Screens/SettingsScreen/ProfileScreen/ProfileScreen.module.css";
import { useNav } from "Pharmacy/hooks/useNav";
import { useEffect, useState } from "react";
import { settingsPatient } from "Pharmacy/utils/navigationLinks";
import * as Routes from "Pharmacy/Routes/PharmacyRoutes/paths";

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
