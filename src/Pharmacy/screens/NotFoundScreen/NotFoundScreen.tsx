import styles from "Pharmacy/screens/NotFoundScreen/NotFoundScreen.module.css";
import { useNav } from "Pharmacy/hooks/useNav";
import { useEffect, useState } from "react";
import {
  navLinksPharmacist,
  navLinksPatient,
} from "Pharmacy/utils/navigationLinks";
import { ErrorIllustration } from "Pharmacy/assets/IconComponents";

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
