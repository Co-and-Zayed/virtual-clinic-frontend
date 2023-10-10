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
import { logoutAction } from "redux/User/userAction";
import { refreshAccessTokenService } from "services/refreshAccessTokenService";
import {
  UPDATE_ACCESS_TOKEN,
} from "redux/User/loginTypes";

interface MainViewContainerProps {
  children: React.ReactNode;
}

const MainViewContainer: FC<MainViewContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [currentLink, setCurrentLink] = useState(0);
  const [currentNavLinks, setCurrentNavLinks] = useState<any>(null);

  const {
    userData,
    userType,
    accessToken,
    refreshToken,
  } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    console.log("CURRENT USER TYPE: ", userType);
    if (userType === "DOCTOR") {
      setCurrentNavLinks(navLinksDoctor);
    } else if (userType === "PATIENT") {
      setCurrentNavLinks(navLinksPatient);
    } else if (userType === "ADMIN") {
      setCurrentNavLinks(navLinksAdmin);
    } else {
      navigate("/login");
    }
  }, [userType]);

  const handleLogoutClick = async () => {
    await dispatch(logoutAction());
    navigate("/login");
  };

  useEffect(() => {
    for (let i = 0; i < currentNavLinks?.length; i++) {
      console.log(currentNavLinks[i]?.route, window.location.pathname);
      console.log(currentNavLinks[i]?.route === window.location.pathname);
      if (currentNavLinks[i]?.route === window.location.pathname) {
        setCurrentLink(i);
      }
    }
  }, [window.location.pathname, currentNavLinks]);

  useEffect(() => {
    console.log("USER DATA: ", userData);
    console.log("USER TYPE: ", userType);
    console.log("ACCESS TOKEN: ", accessToken);
    console.log("REFRESH TOKEN: ", refreshToken);
  }, [userData, userType, accessToken, refreshToken]);

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
            // logoutLoading
            // ?
            //   <Spin />
            // :
            <li onClick={handleLogoutClick}>Logout</li>
          }
        </ul>

        <hr />
      </div>

      {children}
    </div>
  );
};

export default MainViewContainer;
