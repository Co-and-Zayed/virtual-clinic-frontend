import styles from "screens/HomeScreen/HomeScreen.module.css";
import { useNavigate } from "react-router";

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1 className={styles.headerText}>Hello World</h1>
            <button onClick={() => navigate("/login")}>login</button>
        </div>
    );
}

export default HomeScreen;