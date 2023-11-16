import styles from "VirtualClinic/screens/VirtualClinicScreens/HomeScreen/HomeScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
} from "VirtualClinic/utils/navigationLinks";

const HomeScreen = () => {
  const isLoggedIn = true;
  const navigate = useNav();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  return <></>;
};

export default HomeScreen;
