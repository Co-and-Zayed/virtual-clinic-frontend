import { Button } from "antd";
import styles from "components/RoundedButton/RoundedButton.module.css";
import { FC } from "react";
import { RightArrowIcon } from "assets/IconComponents";
import JellyLoader from "../JellyLoader/JellyLoader";

interface RoundedButtonProps {
  text: string;
  icon?: any;
  width?: any;
  onClick?: () => void;
  style?: any;
  className?: string;
  colorInverted?: boolean;
  disabled?: boolean;
  type?: any;
  loading?: boolean;
}

const RoundedButton: FC<RoundedButtonProps> = ({
  text,
  icon,
  width = "14rem",
  onClick,
  style,
  className,
  colorInverted,
  disabled,
  type,
  loading,
}) => {
  return (
    <Button
      htmlType={type}
      type={type}
      disabled={disabled}
      className={`${
        colorInverted ? styles.checkoutBtnInv : styles.checkoutBtn
      } ${
        !loading ? (colorInverted ? styles.hoverInv : styles.hover) : ""
      } ${className}`}
      onClick={onClick}
      style={{ ...style, minWidth: width }}
    >
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <JellyLoader color={colorInverted ? "#fff" : "var(--dark-green)"} />
        </div>
      ) : (
        <p className="text-center" style={{ flex: 1 }}>
          {text?.toUpperCase()}
        </p>
      )}
      {!loading && icon && icon}
    </Button>
  );
};

export default RoundedButton;
