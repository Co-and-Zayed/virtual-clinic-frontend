import styles from "Pharmacy/screens/User Screens/Patient Screens/SettingsScreen/PasswordScreen/PasswordScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState } from "react";
import { settingsPatient } from "Pharmacy/utils/navigationLinks";
import * as Routes from "Pharmacy/Routes/PharmacyRoutes/paths";

const PasswordScreen = () => {
  return (
    <>
      <div className={`${styles.settingsSection}`}>
        <h2 className={`${styles.subHeading}`}>Change Password</h2>
        <div className={`${styles.divider}`}></div>
        <div>balabizo</div>
      </div>
    </>
  );
};

export default PasswordScreen;
