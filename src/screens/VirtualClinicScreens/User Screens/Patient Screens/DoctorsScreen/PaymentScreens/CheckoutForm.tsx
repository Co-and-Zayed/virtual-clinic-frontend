import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import form from "antd/es/form";
import { BackIcon, RightArrowIcon } from "assets/IconComponents";
import RoundedButton from "components/RoundedButton/RoundedButton";
import { notification } from "antd";

interface CheckoutFormProps {
  setPage: any;
}

export default function CheckoutForm({ setPage }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
