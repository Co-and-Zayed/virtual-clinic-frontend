import styles from "Pharmacy/screens/User Screens/Patient Screens/MedicineScreen/PaymentScreens/PaymentScreens.module.css";
import { FC, useEffect, useState } from "react";
import { RootState } from "Pharmacy/redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, ConfigProvider, Input, Select, Spin } from "antd";
import JellyLoader from "Pharmacy/components/JellyLoader/JellyLoader";
import { motion } from "framer-motion";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import StripeLogo from "Pharmacy/assets/images/StripeLogo.svg";

interface PayWithCardProps {
  setPage: any;
  priceOriginal: number;
  priceDiscounted: number;
  cartItems: any[];
}

const PayWithCard: FC<PayWithCardProps> = ({
  setPage,
  priceOriginal,
  priceDiscounted,
  cartItems,
}) => {
  // Stripe Stuff
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_PHARMACY}stripe/config`).then(
      async (r) => {
        const { publishableKey } = await r.json();
        console.log(publishableKey);
        setStripePromise(loadStripe(publishableKey));
      }
    );
  }, []);

  useEffect(() => {
    // console.log("USer Data", userData);
    fetch(
      `${process.env.REACT_APP_BACKEND_PHARMACY}stripe/create-payment-intent`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: priceDiscounted * 100,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

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
                  <CheckoutForm
                    setPage={setPage}
                    priceDiscounted={priceDiscounted}
                    cartItems={cartItems}
                  />
                </Elements>
              </motion.div>
            ) : (
              <div className="w-full h-[20rem] flex items-center justify-center">
                <JellyLoader />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-y-14">
            {/* DIVIDER */}
            <div className="w-full h-[2px] bg-gray-200"></div>

            {/* STRIPE LOGO */}
            <div className="w-full flex items-center justify-center">
              <img src={StripeLogo} alt="Stripe Logo" />
            </div>
          </div>
        </div>
      </motion.div>
    </ConfigProvider>
  );
};

export default PayWithCard;
