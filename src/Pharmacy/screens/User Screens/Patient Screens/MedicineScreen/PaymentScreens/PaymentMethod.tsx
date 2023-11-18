import styles from "Pharmacy/screens/User Screens/Patient Screens/MedicineScreen/PaymentScreens/PaymentScreens.module.css";
import inputStyles from "Pharmacy/components/InputField/InputField.module.css";
import { useNavigate, useParams } from "react-router";
import { FC, useEffect, useRef, useState } from "react";
import { RootState } from "Pharmacy/redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Input,
  Select,
  Spin,
  notification,
} from "antd";
import { motion } from "framer-motion";
import BackIcon from "Pharmacy/assets/IconComponents/BackIcon";
import WalletIcon from "Pharmacy/assets/IconComponents/WalletIcon";
import CreditCardIcon from "Pharmacy/assets/IconComponents/CreditCardIcon";
import RoundedButton from "Pharmacy/components/RoundedButton/RoundedButton";
import PayWithWallet from "./PayWithWallet";
import PayWithCard from "./PayWithCard";
import PayOnDelivery from "./PayOnDelivery";
import ConfirmationScreen from "./ConfirmationScreen";
import { CashOnDelivery } from "Pharmacy/assets/IconComponents";
import { useNav } from "Pharmacy/hooks/useNav";

interface PaymentMethodProps {
  priceOriginal: number;
  priceDiscounted: number;
  cartItems: any[];
}

const PaymentMethod: FC<PaymentMethodProps> = ({
  priceOriginal,
  priceDiscounted,
  cartItems,
}) => {
  const navigate = useNav();
  const [page, setPage] = useState<
    "onDelivery" | "wallet" | "card" | "confirmation" | "paymentMethod"
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
            cartItems={cartItems}
          />
        );
      case "card":
        return (
          <PayWithCard
            setPage={setPage}
            priceOriginal={priceOriginal}
            priceDiscounted={priceDiscounted}
            cartItems={cartItems}
          />
        );
      case "onDelivery":
        return (
          <PayOnDelivery
            setPage={setPage}
            priceOriginal={priceOriginal}
            priceDiscounted={priceDiscounted}
            cartItems={cartItems}
          />
        );
      case "confirmation":
        return <ConfirmationScreen setPage={setPage} />;
    }
  }

  function paymentMethodPage() {
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full flex flex-col items-center justify-evenly gap-y-8"
          style={{ flex: 1 }}
        >
          <div className="w-full flex items-center justify-center gap-x-8">
            {/* PAY ON DELIVERY */}
            <div
              className={`${styles.registerCard} gap-y-14`}
              onClick={() => setPage("onDelivery")}
            >
              <CashOnDelivery
                className={`w-[7rem] h-[7rem] ${styles.registerCardImage}`}
              />
              <h1 className={styles.h1}>On Delivery</h1>
            </div>
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
            onClick={() => {
              navigate("/medicine");
            }}
          />
        </motion.div>
      </ConfigProvider>
    );
  }

  return choosePage();
};

export default PaymentMethod;
