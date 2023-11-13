import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/PaymentScreens/PaymentScreens.module.css";
import inputStyles from "components/InputField/InputField.module.css";
import { useNavigate, useParams } from "react-router";
import { FC, useEffect, useRef, useState } from "react";
import { RootState } from "redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, ConfigProvider, Input, Select, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { WalletIcon, CreditCardIcon, BackIcon } from "assets/IconComponents";
import RoundedButton from "components/RoundedButton/RoundedButton";
import { Dayjs } from "dayjs";
import PayWithWallet from "./PayWithWallet";
import PayWithCard from "./PayWithCard";
import ConfirmationScreen from "./ConfirmationScreen";

interface PaymentMethodProps {
  backBtnOnClick: any;
  appointmentDate?: Dayjs | null;
  priceOriginal: number;
  priceDiscounted: number;
  transactionDescription?: string;
  callBackOnSuccess: any;
}

const PaymentMethod: FC<PaymentMethodProps> = ({
  backBtnOnClick,
  appointmentDate,
  priceOriginal,
  priceDiscounted,
  transactionDescription: description,
  callBackOnSuccess,
}) => {
  const dispatch: any = useDispatch();

  const [page, setPage] = useState<
    "wallet" | "card" | "confirmation" | "paymentMethod"
  >("paymentMethod");

  function choosePage() {
    switch (page) {
      case "paymentMethod":
        return paymentMethodPage();

      case "wallet":
        return (
          <PayWithWallet
            setPage={setPage}
            priceOriginal={priceOriginal}
            priceDiscounted={priceDiscounted}
            appointmentDate={appointmentDate || null}
            callBack={callBackOnSuccess}
          />
        );
      case "card":
        return (
          <PayWithCard
            setPage={setPage}
            priceOriginal={priceOriginal}
            priceDiscounted={priceDiscounted}
            appointmentDate={appointmentDate || null}
            description={description}
            callBack={callBackOnSuccess}
          />
        );
      case "confirmation":
        return <ConfirmationScreen backBtnOnClick={backBtnOnClick} />;
    }
  }

  function paymentMethodPage() {
    return (<ConfigProvider
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-evenly gap-y-8"
      style={{ flex: 1 }}
    >
      <div className="w-full flex items-center justify-center gap-x-8">
        {/* WALLET */}
        <div
          className={`${styles.registerCard} gap-y-14`}
          onClick={() => setPage("wallet")}
        >
          <WalletIcon
            className={`w-[7rem] h-[7rem] ${styles.registerCardImage}`}
          />
          <h1 className={styles.h1}>Wallet</h1>
          {/* <div className={`${styles.registerCardCircle}`}></div> */}
        </div>
        {/* CARD */}
        <div
          className={`${styles.registerCard} gap-y-14`}
          onClick={() => setPage("card")}
        >
          <CreditCardIcon
            className={`w-[7rem] h-[7rem] ${styles.registerCardImage}`}
          />
          <h1 className={styles.h1}>Card</h1>
          {/* <div className={`${styles.registerCardCircle}`}></div> */}
        </div>
      </div>

      {/* BACK BUTTON */}
      <RoundedButton
        text="Back"
        icon={<BackIcon fontSize={14} />}
        width={"8rem"}
        onClick={backBtnOnClick}
      />
    </motion.div>
  </ConfigProvider>);

  }

  return choosePage();
};
export default PaymentMethod;
