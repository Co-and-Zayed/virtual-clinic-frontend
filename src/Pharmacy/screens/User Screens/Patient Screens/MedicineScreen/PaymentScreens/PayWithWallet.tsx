import styles from "Pharmacy/screens/User Screens/Patient Screens/MedicineScreen/PaymentScreens/PaymentScreens.module.css";
import { FC } from "react";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import BackIcon from "Pharmacy/assets/IconComponents/BackIcon";
import { RightArrowIcon } from "Pharmacy/assets/IconComponents";
import RoundedButton from "Pharmacy/components/RoundedButton/RoundedButton";
import { ConfigProvider } from "antd";
import { UPDATE_USER_DATA } from "Pharmacy/redux/User/loginTypes";
import { GET_CART } from "Pharmacy/redux/PharmacyRedux/types";

interface PayWithWalletProps {
  setPage: any;
  priceOriginal: number;
  priceDiscounted: number;
  cartItems: any[];
}

const PayWithWallet: FC<PayWithWalletProps> = ({
  setPage,
  priceOriginal,
  priceDiscounted,
  cartItems,
}) => {
  const dispatch: any = useDispatch();

  const { accessToken, userData } = useSelector(
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
                    {(userData.wallet - priceDiscounted).toLocaleString()} EGP
                  </p>
                )}
              </div>
            </div>
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
              const cart = cartItems.map((item) => {
                return {
                  medicine: item.medicine,
                  quantity: item.quantity,
                };
              });

              const res = await fetch(
                `${process.env.REACT_APP_BACKEND_PHARMACY}buyMedicines`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: JSON.stringify({
                    paymentMethod: "WALLET",
                    totalPrice: priceDiscounted,
                    cart,
                  }),
                }
              );

              const data = await res.json();

              if (data.user) {
                dispatch({
                  type: UPDATE_USER_DATA,
                  payload: data.user,
                });

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

export default PayWithWallet;
