import styles from "screens/VirtualClinicScreens/NotFoundScreen/NotFoundScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
} from "utils/VirtualClinicUtils/navigationLinks";

const NotFoundScreen = () => {
  return <>Error 404 - This page does not exist</>;
};

export default NotFoundScreen;
