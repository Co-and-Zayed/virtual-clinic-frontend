import styles from "components/MainViewContainer/MainViewContainer.module.css";
import { FC } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import SideBar from "../SideBar/SideBar";

interface MainViewContainerProps {
  children: React.ReactNode;
}

const MainViewContainer: FC<MainViewContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  return (
    <div className={`${styles.mainViewContainer} flex`}>
      <SideBar className={styles.sideBar} />

      <div className={`${styles.children}`}>{children}</div>
    </div>
  );
};

export default MainViewContainer;
