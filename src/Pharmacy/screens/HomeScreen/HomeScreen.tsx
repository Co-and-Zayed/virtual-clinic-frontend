import styles from "Pharmacy/screens/HomeScreen/HomeScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState } from "react";
import {
  navLinksPharmacist,
  navLinksPatient,
} from "Pharmacy/utils/navigationLinks";

const HomeScreen = () => {
  const isLoggedIn = true;
  const navigate = useNav();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <></>;
};

export default HomeScreen;
