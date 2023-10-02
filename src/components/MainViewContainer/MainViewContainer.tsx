import styles from "components/MainViewContainer/MainViewContainer.module.css";
import { FC } from "react";

interface MainViewContainerProps {
    children: React.ReactNode;
}
  
const MainViewContainer: FC<MainViewContainerProps> = ({ children }) => {
    return (
        <div className={styles.mainViewContainer}>
            {
                children
            }
        </div>
    )
}

export default MainViewContainer;