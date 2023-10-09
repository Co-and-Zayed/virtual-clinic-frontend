import styles from "components/MainViewContainer/MainViewContainer.module.css";
import { FC } from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
  navLinksAdmin,
} from "utils/VirtualClinicUtils/navigationLinks";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "redux/rootReducer";
import { logoutAction } from "redux/Logout/logoutAction";
import { Spin } from "antd";
import { LOG_OUT } from "redux/VirtualClinicRedux/types";
import { LOGIN_SUCCESS } from "redux/Login/loginTypes";

interface MainViewContainerProps {
  children: React.ReactNode;
}

const MainViewContainer: FC<MainViewContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [currentLink, setCurrentLink] = useState(0);
  const [currentNavLinks, setCurrentNavLinks] = useState<any>(null);

  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.loginReducer
  );
  const { registerLoading } = useSelector(
    (state: RootState) => state.registerReducer
  );
  const { logoutLoading } = useSelector(
    (state: RootState) => state.logoutReducer
  );

  useEffect(() => {
    // dispatch({type: LOG_OUT})
    if (userType === "DOCTOR") {
      setCurrentNavLinks(navLinksDoctor);
    } else if (userType === "PATIENT") {
      setCurrentNavLinks(navLinksPatient);
    } else if (userType === "ADMIN") {
      setCurrentNavLinks(navLinksAdmin);
    } else {
      window.location.pathname = "/login";
    }
  }, [userType, loginLoading, registerLoading]);

  useEffect(() => {
    console.log("PATH NAAAME", window.location.pathname);
    for (let i = 0; i < currentNavLinks?.length; i++) {
      console.log(currentNavLinks[i]?.route, window.location.pathname);
      console.log(currentNavLinks[i]?.route === window.location.pathname);
      if (currentNavLinks[i]?.route === window.location.pathname) {
        console.log("SETTING CURRENT LINK", i);
        setCurrentLink(i);
      }
    }
  }, [window.location.pathname, currentNavLinks]);

  return (
    <div className={styles.mainViewContainer}>
      <div
        className={`${styles.sideBar} w-full flex flex-col items-start justify-center`}
      >
        <h1 className="w-full flex justify-center items-center myfont-xl font-bold">
          {userType}
        </h1>

        <ul>
          {currentNavLinks?.map((link: any, index: any) => (
            <li
              key={index}
              className={`${currentLink === index ? styles.activeLink : ""}`}
              onClick={() => {
                navigate(link.route);
              }}
            >
              {link.name}
            </li>
          ))}

          {
            logoutLoading
            ?
              <Spin />
            :
            <li
              onClick={() => {
                dispatch(logoutAction());
              }}
            >
              Logout
            </li>
          }
        </ul>

        <hr />
      </div>

      {children}
    </div>
  );
};

export default MainViewContainer;
