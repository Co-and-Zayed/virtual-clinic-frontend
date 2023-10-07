import styles from "components/MainViewContainer/MainViewContainer.module.css";
import { FC } from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  navLinksDoctor,
  navLinksPatient,
  navLinksAdmin,
} from "utils/VirtualClinicUtils/navigationLinks";

interface MainViewContainerProps {
  children: React.ReactNode;
}

const MainViewContainer: FC<MainViewContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  const [currentLink, setCurrentLink] = useState(0);
  const [currentNavLinks, setCurrentNavLinks] = useState<any>(null);

  var currentUser = process.env.REACT_APP_CURRENT_USER;

  useEffect(() => {
    if (currentUser === "Doctor") {
      setCurrentNavLinks(navLinksDoctor);
    } else if (currentUser === "Patient") {
      setCurrentNavLinks(navLinksPatient);
    } else {
      setCurrentNavLinks(navLinksAdmin);
    }
  }, []);

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
          {currentUser}
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
          <li>Logout</li>
        </ul>

        <hr />
      </div>

      {children}
    </div>
  );
};

export default MainViewContainer;
