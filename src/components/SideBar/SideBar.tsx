import { Input } from "antd";
import styles from "components/SideBar/SideBar.module.css";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
  navLinksAdmin,
} from "utils/VirtualClinicUtils/navigationLinks";
import { RootState } from "redux/rootReducer";
import { logoutAction } from "redux/User/userAction";
import { CLEAR_TIMEOUTS } from "redux/User/loginTypes";
// import { DashboardIcon } from "assets/images";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { SettingsIcon, LogoutIcon } from "assets/IconComponents";
import * as Routes from "Routes/VirtualClinicRoutes/paths";

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const [currentLink, setCurrentLink] = useState(0);
  const [currentNavLinks, setCurrentNavLinks] = useState<any>(null);

  const { userData, userType, accessToken, refreshToken } = useSelector(
    (state: RootState) => state.userReducer
  );

  const generateLink = (link: {
    name: any;
    icon: any;
    route: any;
    index: any;
    onClick?: any;
  }) => {
    return (
      <div
        className={`${styles.linkContainer} ${
          currentLink === link.index ? styles.activeLink : styles.nonActiveLink
        } flex items-center`}
        onClick={() => {
          navigate(link.route);
          if (link?.onClick) {
            link?.onClick();
          }
        }}
      >
        <div
          className={`${currentLink === link.index ? styles.isActive : ""}`}
        ></div>

        <div className={`${styles.icon}`}>{link.icon}</div>
        <li className={`${styles.linkName}`} key={link.index}>
          {link.name}
        </li>
      </div>
    );
  };

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
    // loop on each element in allTimeouts and clear it
    await dispatch({
      type: CLEAR_TIMEOUTS,
    });

    await dispatch(logoutAction());
    navigate("/login");
  };

  useEffect(() => {
    setCurrentLink(-1);
    for (let i = 0; i < currentNavLinks?.length; i++) {
      if (currentNavLinks[i]?.route === window.location.pathname) {
        setCurrentLink(i);
        return;
      }
    }

    if (Routes.SETTINGS_PATH === window.location.pathname) {
      setCurrentLink(currentNavLinks?.length + 1);
      return;
    }
  }, [window.location.pathname, currentNavLinks]);

  return (
    <div className={`${styles.sideBar} flex flex-col items-start gap-y-6`}>
      <h1 className="flex justify-center items-center myfont-xl font-bold">
        {userType}
      </h1>

      <ul className={`h-full flex flex-col justify-between pb-12`}>
        <div>
          {currentNavLinks?.map((link: any, index: any) =>
            generateLink({ ...link, index })
          )}
        </div>

        <div>
          {generateLink({
            name: "Settings",
            icon: <SettingsIcon />,
            route: "/settings",
            index: currentNavLinks?.length + 1,
          })}

          {generateLink({
            name: "Logout",
            icon: <LogoutIcon />,
            route: window.location.pathname,
            index: currentNavLinks?.length + 2,
            onClick: handleLogoutClick,
          })}
        </div>
      </ul>
    </div>
  );
};

export default SideBar;
