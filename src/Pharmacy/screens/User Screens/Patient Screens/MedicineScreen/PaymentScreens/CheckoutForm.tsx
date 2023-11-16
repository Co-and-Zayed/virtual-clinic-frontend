import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import form from "antd/es/form";
import { RightArrowIcon } from "Pharmacy/assets/IconComponents";
import BackIcon from "Pharmacy/assets/IconComponents/BackIcon";
import RoundedButton from "Pharmacy/components/RoundedButton/RoundedButton";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GET_CART } from "Pharmacy/redux/PharmacyRedux/types";

interface CheckoutFormProps {
  setPage: any;
  cartItems: any[];
  priceDiscounted: number;
}

export default function CheckoutForm({
  setPage,
  cartItems,
  priceDiscounted,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { accessToken } = useSelector((state: any) => state.userReducer);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message ?? null);
      notification.error({
        message: "Error",
        description: error.message,
      });
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // SUCCESS !
      console.log("PAYING WITH CARD");
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
            paymentMethod: "CREDIT_CARD",
            totalPrice: priceDiscounted,
            cart,
          }),
        }
      );

      dispatch({ type: GET_CART, payload: true });
      setMessage("Payment successful! 🎉");
      notification.success({
        message: "Success",
        description: "Payment successful! 🎉",
      });

      setPage("confirmation");
    } else {
      setMessage("An unexpected error occured.");
      notification.error({
        message: "Error",
        description: "An unexpected error occured.",
      });
    }

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      className="w-full flex flex-col gap-y-8"
      onSubmit={handleSubmit}
    >
      <PaymentElement id="payment-element" />
      {/* CONFIRM BUTTON */}
      <div className={`flex items-center justify-center gap-x-5`}>
        {/* BACK BUTTON */}
        <RoundedButton
          text="Change Payment Method"
          icon={<BackIcon fontSize={14} />}
          width={"calc(50% - 0.625rem)"}
          onClick={() => setPage("paymentMethod")}
        />
        <RoundedButton
          text="Confirm Purchase"
          icon={<RightArrowIcon fontSize={18} style={{ rotate: "-45deg" }} />}
          width={"calc(50% - 0.625rem)"}
          type="submit"
          colorInverted
          disabled={isProcessing || !stripe || !elements}
          loading={isProcessing}
        />
      </div>
      {/* Show any error or success messages
      {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
}
