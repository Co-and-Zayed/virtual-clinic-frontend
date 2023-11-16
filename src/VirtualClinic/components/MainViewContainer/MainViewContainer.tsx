import styles from "VirtualClinic/components/MainViewContainer/MainViewContainer.module.css";
import { FC, useEffect } from "react";
import { useNav } from "hooks/useNav";
import { useSelector, useDispatch } from "react-redux";

import SideBar from "../SideBar/SideBar";

interface MainViewContainerProps {
  children: React.ReactNode;
}

const MainViewContainer: FC<MainViewContainerProps> = ({ children }) => {
  const navigate = useNav();
  const dispatch: any = useDispatch();

  useEffect(() => {
    document.body.style.backgroundColor = "var(--bg-main)";
  }, []);
  return (
    <div className={`${styles.mainViewContainer} flex`}>
      <SideBar />
      <div className={`${styles.children}`}>{children}</div>
    </div>
  );
};

export default MainViewContainer;
