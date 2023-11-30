import inputStyles from "Pharmacy/components/InputField/InputField.module.css";
import { useNavigate, useParams, useLocation } from "react-router";
import { FC, useEffect, useRef, useState } from "react";
import { RootState } from "VirtualClinic/redux/rootReducer";
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
import PaymentMethod from "./PaymentScreens/PaymentMethod";

const BuyMedicineScreen = () => {
  const { state } = useLocation();
  const [page, setPage] = useState("paymentMethod");
  useEffect(() => {
    console.log(state);
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
      <div className={`flex items-center justify-start`}>
        <h1 className="pageHeading">Payment Process</h1>
      </div>
      <div className="w-full h-full flex flex-col items-start justify-start">
        <PaymentMethod
          priceOriginal={state?.totalPrice || 0}
          priceDiscounted={state?.totalPrice || 0}
          cartItems={state?.cart || []}
        />
      </div>
    </ConfigProvider>
  );
};

export default BuyMedicineScreen;
