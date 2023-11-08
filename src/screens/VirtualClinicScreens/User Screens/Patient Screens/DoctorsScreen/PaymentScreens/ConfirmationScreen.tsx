import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/PaymentScreens/PaymentScreens.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import { BackIcon } from "assets/IconComponents";
import CofirmTick from "assets/images/ConfirmTick.svg";
import RoundedButton from "components/RoundedButton/RoundedButton";
interface ConfirmationScreenProps {
  setPage: any;
}
const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ setPage }) => {
  //const { name } = useParams<{ name: string }>();   //name of dr
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
        <div className="flex flex-col items-center justify-center my-10">
          <RoundedButton
            text="BACK TO BOOKING"
            icon={<BackIcon fontSize={18} />}
            // width="20rem"
            onClick={() => {
              setPage("booking");
            }}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};
export default ConfirmationScreen;