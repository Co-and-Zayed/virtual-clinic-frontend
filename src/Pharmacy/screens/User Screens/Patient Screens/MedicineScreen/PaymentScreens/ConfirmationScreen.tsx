import styles from "Pharmacy/screens/User Screens/Patient Screens/MedicineScreen/PaymentScreens/PaymentScreens.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import BackIcon from "Pharmacy/assets/IconComponents/BackIcon";
import CofirmTick from "Pharmacy/assets/images/ConfirmTick.svg";
import RoundedButton from "Pharmacy/components/RoundedButton/RoundedButton";

interface PaymentMethodProps {
  setPage: any;
}

const ConfirmationScreen: React.FC<PaymentMethodProps> = ({ setPage }) => {
  const dispatch: any = useDispatch();

  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.compactAlgorithm,

        token: {
          // colorBgBase: "red",
          colorPrimary: "#163B45",
          colorBgContainer: "transparent",
        },

        components: {},
      }}
    >
      {/* Row1: Tick, "PAYMENT SUCCESSFUL", Row2: "Back To Booking" Rounded button */}
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-x-10">
          <img src={CofirmTick} alt="tick" className="w-22 h-22" />
          <p
            className={`text-4xl font-normal text-center`}
            style={{
              letterSpacing: "0.35rem",
            }}
          >
            PAYMENT SUCCESSFUL
          </p>
        </div>
      </div>
    </ConfigProvider>
  );
};
export default ConfirmationScreen;
