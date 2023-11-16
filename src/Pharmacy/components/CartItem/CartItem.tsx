import { FC, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import AnimatedNumbers from "react-animated-numbers";
import styles from "./CartItem.module.css";
import FlipNumbers from "react-flip-numbers";
import { Badge } from "antd";
import Counter from "../Counter/Counter";
import AnimatedDigitsLarge from "../AnimatedDigitsLarge/AnimatedDigitsLarge";
import { DeleteOutlined } from "@ant-design/icons";
import { useNav } from "hooks/useNav";

interface CartItemProps {
  id: any;
  picture: any;
  price: number;
  name: string;
  quantity: any;
  setQuantity: any;
  deleteItem: any;
  maxAmount: number;
}

const CartItem: FC<CartItemProps> = ({
  id,
  picture,
  price,
  name,
  quantity,
  setQuantity,
  deleteItem,
  maxAmount,
}) => {
  const navigate = useNav();

  const handleCartClick = (event: any) => {
    console.log(event.target.id);
    if (event.target.id === "cartItem" || event.target.id === "name") {
      navigate("/medicine?id=" + id);
    }
  };
  return (
    <div
      className={`${styles.cartItem} flex items-start`}
      id="cartItem"
      onClick={handleCartClick}
    >
      <div
        className={`${styles.cartImage}`}
        style={{
          backgroundImage: picture?.includes("https")
            ? `url('${encodeURI(picture)})`
            : `url('${process.env.REACT_APP_BUCKET_URL}${picture}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        id="cartItem"
        className={`${styles.cartDataContainer} flex flex-col items-start justify-between`}
      >
        <div className="w-full flex flex-col justify-start items-start">
          <div
            className="w-full flex items-center justify-between"
            id="cartItem"
          >
            <p
              id="name"
              className={`${styles.medicineName}`}
              style={{ marginBottom: "-0.25rem" }}
            >
              {name}
            </p>
            <DeleteOutlined
              className={`cursor-pointer`}
              style={{ color: "red" }}
              onClick={deleteItem}
            />
          </div>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--faded-green)",
              fontWeight: "100",
            }}
          >
            {price} EGP / unit
          </p>
        </div>
        <div id="cartItem" className="w-full flex justify-between items-center">
          <Counter
            maxAmount={maxAmount}
            quantity={quantity}
            setQuantity={setQuantity}
            width={5}
            customSet
          />
          <div className="flex h-full items-end">
            <AnimatedDigitsLarge count={quantity * price} size={18} />
            <div
              className="ml-2"
              style={{
                letterSpacing: "0.15rem",
                lineHeight: "initial",
                fontSize: "0.8rem",
                fontWeight: 100,
              }}
            >
              EGP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
