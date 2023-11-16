import styles from "screens/VirtualClinicScreens/HomeScreen/HomeScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
} from "utils/VirtualClinicUtils/navigationLinks";

const HomeScreen = () => {
  const isLoggedIn = true;
  const navigate = useNav();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      // navigate("/login");
    }
  }, []);

  return <></>;
};

export default HomeScreen;
