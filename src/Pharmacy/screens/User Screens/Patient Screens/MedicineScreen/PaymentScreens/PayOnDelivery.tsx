import styles from "Pharmacy/screens/User Screens/Patient Screens/MedicineScreen/PaymentScreens/PaymentScreens.module.css";
import { FC, useEffect } from "react";
import { RootState } from "Pharmacy/redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import BackIcon from "Pharmacy/assets/IconComponents/BackIcon";
import { RightArrowIcon } from "Pharmacy/assets/IconComponents";
import RoundedButton from "Pharmacy/components/RoundedButton/RoundedButton";
import { ConfigProvider } from "antd";
import { UPDATE_USER_DATA } from "Pharmacy/redux/User/loginTypes";
import { GET_CART } from "Pharmacy/redux/PharmacyRedux/types";

interface PayOnDeliveryProps {
  setPage: any;
  priceOriginal: number;
  priceDiscounted: number;
  cartItems: any[];
}

const PayOnDelivery: FC<PayOnDeliveryProps> = ({
  setPage,
  priceOriginal,
  priceDiscounted,
  cartItems,
}) => {
  const dispatch: any = useDispatch();

  const { accessToken, userData } = useSelector(
    (state: RootState) => state.userReducer
  );

  console.log(userData);

  useEffect(() => {
    console.log("PRICE ORIGINAL", priceOriginal);
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
          <div className="w-[30rem] flex flex-col items-end justify-center gap-y-2">
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
          </div>
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
              console.log("PAYING ON DELIVERY");
              console.log("CART ITEMS", cartItems);
              const cart = cartItems.map((item) => {
                return {
                  medicine: item.medicine,
                  quantity: item.quantity,
                };
              });
              console.log("CART", cart);
              const res = await fetch(
                `${process.env.REACT_APP_BACKEND_PHARMACY}buyMedicines`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: JSON.stringify({
                    paymentMethod: "ON_DELIVERY",
                    totalPrice: priceDiscounted,
                    cart,
                  }),
                }
              );

              const data = await res.json();
              if (data.user) {
                console.log("USER IN PAY ON DELIVERY", data.user);
                dispatch({ type: GET_CART, payload: false });
                setPage("confirmation");
              }
            }}
            colorInverted
            disabled={userData.wallet < priceDiscounted}
          />
        </div>
      </motion.div>
    </ConfigProvider>
  );
};

export default PayOnDelivery;
