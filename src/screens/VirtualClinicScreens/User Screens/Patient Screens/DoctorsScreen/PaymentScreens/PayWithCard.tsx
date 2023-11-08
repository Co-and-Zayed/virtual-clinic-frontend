import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/PaymentScreens/PaymentScreens.module.css";
import inputStyles from "components/InputField/InputField.module.css";
import { useNavigate, useParams } from "react-router";
import { FC, useEffect, useRef, useState } from "react";
import { RootState } from "redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, ConfigProvider, Input, Select, Spin } from "antd";
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
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import StripeLogo from "assets/images/StripeLogo.svg";

interface PayWithCard {
  setPage: any;
  priceOriginal: any;
  priceDiscounted: any;
  appointmentDate: Dayjs | null;
  description?: string;
  callBack: () => Promise<boolean>;
}

const PayWithCard: FC<PayWithCard> = ({
  setPage,
  priceOriginal,
  priceDiscounted,
  appointmentDate,
  description,
  callBack,
}) => {
  const dispatch: any = useDispatch();

  const { userData } = useSelector((state: RootState) => state.userReducer);

  // Stripe Stuff
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}stripe/config`).then(
      async (r) => {
        const { publishableKey } = await r.json();
        console.log(publishableKey);
        setStripePromise(loadStripe(publishableKey));
      }
    );
  }, []);

  useEffect(() => {
    // console.log("USer Data", userData);
    fetch(`${process.env.REACT_APP_BACKEND_URL}stripe/create-payment-intent`, {
      method: "POST",
      body: JSON.stringify({
        amount: priceDiscounted * 100,
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  // STRIPE FORM

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
          <div className="w-[33rem] flex flex-col items-end justify-center gap-y-2">
            {/* ORIGINAL */}
            <p className={`${styles.priceLight}`}>
              {`${priceOriginal.toLocaleString()} EGP`}
            </p>
            {
              // DISCOUNT
              priceDiscounted !== priceOriginal && (
                <div className={`flex gap-x-6`}>
                  <p className={`${styles.priceLight}`}>
                    {`(${(
                      (100.0 * (priceOriginal - priceDiscounted)) /
                      priceOriginal
                    ).toLocaleString()}% off)`}
                  </p>
                  <p className={`${styles.priceLight}`}>
                    {`- ${(
                      priceOriginal - priceDiscounted
                    ).toLocaleString()} EGP`}
                  </p>
                </div>
              )
            }
            <div className="w-full flex items-end justify-between gap-x-2 mt-2">
              <div className={`text-2xl ${styles.uppercase}`}>TOTAL</div>
              <div className="flex items-end justify-end gap-x-3">
                <p className="text-6xl darkGreenText font-semibold">
                  {priceDiscounted.toLocaleString()}
                </p>
                <p className="text-3xl opacity-30  font-semibold">EGP</p>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-[2px] bg-gray-200"></div>

            {/* STRIPE */}
            {clientSecret && stripePromise ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  // delay: 0.5
                }}
                exit={{ opacity: 0 }}
                className="w-full [20rem] py-4"
              >
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm setPage={setPage} callBack={callBack} />
                </Elements>
              </motion.div>
            ) : (
              <div className="w-full h-[20rem] flex items-center justify-center">
                <JellyLoader />
              </div>
            )}
          </div>

          {appointmentDate && (
            <div className="flex flex-col items-center justify-center gap-y-14">
              {/* APPOINTMENT DATE */}
              {/* DD/MM/YYYY TIME AM/PM */}
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

              {/* DIVIDER */}
              <div className="w-full h-[2px] bg-gray-200"></div>

              {/* STRIPE LOGO */}
              <div className="w-full flex items-center justify-center">
                <img src={StripeLogo} alt="Stripe Logo" />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </ConfigProvider>
  );
};
export default PayWithCard;
