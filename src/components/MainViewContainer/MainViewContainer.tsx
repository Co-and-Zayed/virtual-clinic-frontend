import styles from "components/MainViewContainer/MainViewContainer.module.css";
import { FC } from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
} from "utils/VirtualClinicUtils/navigationLinks";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "Redux/rootReducer";
import { logoutAction } from "Redux/Logout/logoutAction";
import { Spin } from "antd";

interface MainViewContainerProps {
  children: React.ReactNode;
}

const MainViewContainer: FC<MainViewContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [currentLink, setCurrentLink] = useState(0);
  var [currentNavLinks, setCurrentNavLinks] = useState(navLinksDoctor);

  const { loginLoading, userType } = useSelector((state: RootState) => state.loginReducer);
  const { registerLoading } = useSelector((state: RootState) => state.registerReducer);
  const { logoutLoading } = useSelector((state: RootState) => state.logoutReducer);

  useEffect(() => {
    if (userType === "DOCTOR") {
      setCurrentNavLinks(navLinksDoctor);
    } else if (userType === "PATIENT") {
      setCurrentNavLinks(navLinksPatient);
    }
    else {
      window.location.pathname = "/login";
    }
  }, [userType, loginLoading, registerLoading]);

  useEffect(() => {
    for (let i = 0; i < currentNavLinks.length; i++) {
      if (currentNavLinks[i].route === window.location.pathname) {
        setCurrentLink(i);
      }
    }
  }, [window.location.pathname]);

  return (
    <div className={styles.mainViewContainer}>
      <div
        className={`${styles.sideBar} w-full flex flex-col items-start justify-center`}
      >
        <h1 className="w-full flex justify-center items-center myfont-xl font-bold">
          {userType}
        </h1>

        <ul>
          {currentNavLinks.map((link: any, index: any) => (
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
            <li onClick={() => dispatch(logoutAction())}>Logout</li>
          }
        </ul>

        <hr />
      </div>

      {children}
    </div>
  );
};

export default MainViewContainer;
