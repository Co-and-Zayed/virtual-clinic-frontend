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

interface PaymentMethodProps {
  setPage: any;
}

const PaymentMethod: FC<PaymentMethodProps> = ({ setPage }) => {
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full flex flex-col items-center justify-evenly gap-y-8"
        style={{flex: 1}}
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
          onClick={() => setPage("booking")}
        />
      </motion.div>
    </ConfigProvider>
  );
};
export default PaymentMethod;
