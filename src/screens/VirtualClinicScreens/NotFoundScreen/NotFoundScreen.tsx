import styles from "screens/VirtualClinicScreens/NotFoundScreen/NotFoundScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
} from "utils/VirtualClinicUtils/navigationLinks";
import { ErrorIllustration } from "assets/IconComponents";

const NotFoundScreen = () => {
  return (
    <div
      className={`${styles.notFoundPage} w-full flex flex-col items-center justify-center`}
    >
      <p>Oops! Page not found</p>
      <ErrorIllustration fontSize={"50rem"} />
    </div>
  );
};

export default NotFoundScreen;
