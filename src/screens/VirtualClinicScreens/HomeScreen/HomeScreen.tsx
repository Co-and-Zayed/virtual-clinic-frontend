import styles from "screens/VirtualClinicScreens/HomeScreen/HomeScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
} from "utils/VirtualClinicUtils/navigationLinks";

const HomeScreen = () => {
  const isLoggedIn = true;
  const navigate = useNavigate();

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
