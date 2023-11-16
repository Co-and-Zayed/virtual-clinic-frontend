import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/SettingsScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import { settingsPatient } from "VirtualClinic/VirtualClinicUtils/navigationLinks";
import * as Routes from "VirtualClinic/Routes/VirtualClinicRoutes/paths";
import ProfileScreen from "./ProfileScreen/ProfileScreen";
import { useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";

const SettingsScreen = () => {
  const [currentLink, setCurrentLink] = useState(0);
  const [currentPage, setCurrentPage] = useState<any>(null);

  const { userData, accessToken, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  const navigate = useNav();

  useEffect(() => {
    setCurrentLink(-1);
    for (let i = 0; i < settingsPatient?.length; i++) {
      if (window.location.pathname.includes(settingsPatient[i]?.route)) {
        setCurrentPage(settingsPatient[i]?.sub_page);
        return;
      }
    }

    if (window.location.pathname.includes(Routes.SETTINGS_PATH)) {
      setCurrentLink(settingsPatient?.length + 1);
      return;
    }
  }, [window.location.pathname, settingsPatient]);

  return (
    <div className={`w-full h-full flex flex-col items-start justify-center`}>
      <h1 className="pageHeading">Settings</h1>
      <div className="w-full h-full flex">
        <div className={`${styles.navigationContainer}`}>
          {settingsPatient.map((link, index) => {
            if (userType === "ADMIN" && link.name === "Health") return;
            return (
              <div
                className={`${styles.linkContainer} ${
                  window.location.pathname.includes(link.route)
                    ? styles.activeLink
                    : styles.nonActiveLink
                } flex items-center`}
                onClick={async () => {
                  await navigate(link.route);
                }}
              >
                <div
                  className={`${currentLink === index ? styles.isActive : ""}`}
                ></div>

                <div className={`${styles.icon}`}>{link.icon}</div>
                <p className={`${styles.linkName}`} key={index}>
                  {link.name}
                </p>
              </div>
            );
          })}
        </div>

        <div className="w-full h-full flex flex-col items-start">
          {currentPage}
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
