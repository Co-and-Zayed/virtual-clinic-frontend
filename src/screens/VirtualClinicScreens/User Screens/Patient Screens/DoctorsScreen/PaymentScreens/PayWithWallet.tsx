import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/PaymentScreens/PaymentScreens.module.css";
import inputStyles from "components/InputField/InputField.module.css";
import { useNavigate, useParams } from "react-router";
import { FC, useEffect, useRef, useState } from "react";
import { RootState } from "redux/rootReducer";
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
import { SearchOutlined } from "@ant-design/icons";
// import { patientGetDoctorsAction } from "redux/VirtualClinicRedux/PatientGetDoctors/patientGetDoctorsAction";
// import { allSpecialitiesAction } from "redux/VirtualClinicRedux/Dropdowns/AllSpecialities/allSpecialitiesAction";
// import { patientSearchDoctorsAction } from "redux/VirtualClinicRedux/PatientSearchDoctors/patientSearchDoctorsAction";
import { getDoctorInfoAction } from "redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import JellyLoader from "components/JellyLoader/JellyLoader";
import DoctorCard from "components/DoctorCard/DoctorCard";
import { motion } from "framer-motion";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import Badge from "@mui/material/Badge";
import { BackIcon, RightArrowIcon } from "assets/IconComponents";
import InputField from "components/InputField/InputField";
import RoundedButton from "components/RoundedButton/RoundedButton";
import { UPDATE_USER_DATA } from "redux/User/loginTypes";

interface PayWithWallet {
  setPage: any;
  priceOriginal: any;
  priceDiscounted: any;
  appointmentDate: Dayjs | null;
  // returns boolean
  callBack: () => Promise<boolean>;
}

const PayWithWallet: FC<PayWithWallet> = ({
  setPage,
  priceOriginal,
  priceDiscounted,
  appointmentDate,
  callBack,
}) => {
  const dispatch: any = useDispatch();

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.userReducer
  );

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
        <div className="w-full flex items-center justify-evenly">
          {/* SUMMARY */}
          {/* Column: original price, discount, discounted price */}
          <div className="w-[30rem] flex flex-col items-end justify-center gap-y-2">
            {/* ORIGINAL */}
            <p className={`${styles.priceLight}`}>
              {`${priceOriginal?.toLocaleString()} EGP`}
            </p>
            {
              // DISCOUNT
              priceDiscounted !== priceOriginal && (
                <div className={`flex gap-x-6`}>
                  <p className={`${styles.priceLight}`}>
                    {`(${(
                      (100.0 * (priceOriginal - priceDiscounted)) /
                      priceOriginal
                    )?.toLocaleString()}% off)`}
                  </p>
                  <p className={`${styles.priceLight}`}>
                    {`- ${(
                      priceOriginal - priceDiscounted
                    )?.toLocaleString()} EGP`}
                  </p>
                </div>
              )
            }
            <div className="w-full flex items-end justify-between gap-x-2 mt-2">
              <div className={`text-2xl ${styles.uppercase}`}>TOTAL</div>
              <div className="flex items-end justify-end gap-x-3">
                <p className="text-6xl darkGreenText font-semibold">
                  {priceDiscounted?.toLocaleString()}
                </p>
                <p className="text-3xl opacity-30  font-semibold">EGP</p>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-[2px] bg-gray-200"></div>

            {/* REMAINING WALLET AMOUNT */}
            {/* row with spacebetween: "REMAINING WALLET AMOUNT", wallet EGP */}
            <div className="w-full flex items-center justify-between gap-x-2">
              <p className={`text-xs ${styles.uppercase}`}>
                REMAINING WALLET AMOUNT
              </p>
              <div className="flex items-end justify-end gap-x-3">
                {userData.wallet < priceDiscounted ? (
                  <p
                    className={`${styles.price} text-red-600`}
                    style={{ color: "rgb(220, 38, 38)" }}
                  >
                    Not Enough Funds
                  </p>
                ) : (
                  <p className={`${styles.price}`}>
                    {(userData.wallet - priceDiscounted)?.toLocaleString()} EGP
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* APPOINTMENT DATE */}
          {/* DD/MM/YYYY TIME AM/PM */}
          {appointmentDate && (
            <div className="flex flex-col items-center justify-center gap-y-2">
              {/* DATE */}
              <div
                className={`${styles.uppercase} font-semibold text-[0.9rem]`}
              >
                Appointment Date
              </div>
              <div className={`flex items-center justify-center`}>
                <div className={`${styles.appDate}`}>
                  {appointmentDate?.format("DD/MM/YYYY")}
                </div>
                {/* TIME */}
                <div className={`${styles.appTime}`}>
                  {appointmentDate?.format("h:mm A")}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`flex items-center justify-center gap-x-6`}>
          {/* BACK BUTTON */}
          <RoundedButton
            text="Change Payment Method"
            icon={<BackIcon fontSize={14} />}
            width={"8rem"}
            onClick={() => setPage("paymentMethod")}
          />
          {/* CONFIRM BUTTON */}
          <RoundedButton
            text="Confirm Purchase"
            icon={<RightArrowIcon fontSize={18} style={{ rotate: "-45deg" }} />}
            width={"8rem"}
            onClick={async () => {
              await callBack();

              // Deduct from wallet using API

              console.log("PAYING WITH WALLET");
              const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}patient/payWithWallet`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: JSON.stringify({
                    amount: priceDiscounted,
                  }),
                }
              );
              const data = await res.json();
              // get "user" from data
              console.log("PAYED WITH WALLET RESPONSE");
              console.log(data);
              if (data.user)
                dispatch({
                  type: UPDATE_USER_DATA,
                  payload: data.user,
                });

              setPage("confirmation");
            }}
            colorInverted
            disabled={userData.wallet < priceDiscounted}
          />
        </div>
      </motion.div>
    </ConfigProvider>
  );
};
export default PayWithWallet;
