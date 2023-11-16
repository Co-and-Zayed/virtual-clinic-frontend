import styles from "Pharmacy/components/MainViewContainer/MainViewContainer.module.css";
import { FC } from "react";
import { useNav } from "hooks/useNav";
import { useEffect, useState } from "react";
import {
  navLinksPharmacist,
  navLinksPatient,
  navLinksAdmin,
} from "Pharmacy/utils/navigationLinks";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "Pharmacy/redux/rootReducer";
import { logoutAction } from "Pharmacy/redux/User/userAction";
import { refreshAccessTokenService } from "Pharmacy/services/refreshAccessTokenService";
import { CLEAR_TIMEOUTS } from "Pharmacy/redux/User/loginTypes";
import SideBar from "../SideBar/SideBar";

interface MainViewContainerProps {
  children: React.ReactNode;
}

const MainViewContainer: FC<MainViewContainerProps> = ({ children }) => {
  return (
    <div className={`${styles.mainViewContainer} flex`}>
      <SideBar />
      <div className={`${styles.children}`}>{children}</div>
    </div>
  );
};

export default MainViewContainer;
