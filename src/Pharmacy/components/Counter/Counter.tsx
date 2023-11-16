import styles from "Pharmacy/components/Counter/Counter.module.css";
import { FC, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import AnimatedDigits from "../AnimatedDigits/AnimatedDigits";
import { Tooltip } from "antd";
interface CounterProps {
  maxAmount: number;
  quantity: number;
  setQuantity: any;
  customSet?: boolean;
  width?: number; // in rems
}

const Counter: FC<CounterProps> = ({
  maxAmount,
  quantity,
  setQuantity,
  customSet = false,
  width = 7,
}) => {
  const addButton = () => (
    <div
      className={`${styles.addButton} ${
        quantity < maxAmount ? styles.addButtonEnable : styles.addButtonDisable
      } flex items-center justify-center h-full w-1/3`}
      onClick={() => {
        if (customSet) {
          if (quantity < maxAmount) setQuantity(quantity + 1);
        } else {
          setQuantity((prev: any) => {
            if (prev < maxAmount) {
              return prev + 1;
            }
            return prev;
          });
        }
      }}
    >
      <PlusOutlined />
    </div>
  );
  return (
    <div
      className={`flex ${styles.counterContainer}`}
      style={{
        width: `${width}rem`,
        height: `${width / 3}rem`,
        fontSize: `${width / 7}rem`,
      }}
    >
      <div
        className={`${styles.subButton} flex items-center justify-center h-full w-1/3`}
        onClick={() => {
          if (customSet) {
            if (quantity > 1) setQuantity(quantity - 1);
          } else {
            setQuantity((prev: any) => {
              if (prev > 1) {
                return prev - 1;
              }
              return prev;
            });
          }
        }}
      >
        <div className={`${styles.minusIcon}`}></div>
      </div>
      <div className="flex items-center justify-center h-full w-1/3">
        <AnimatedDigits count={quantity} />
      </div>

      {quantity < maxAmount ? (
        addButton()
      ) : (
        <Tooltip
          title={
            <p style={{ fontSize: "0.8rem" }}>
              You cannot purchase more of this item
            </p>
          }
        >
          {addButton()}
        </Tooltip>
      )}
    </div>
  );
};

export default Counter;
