import styles from "Pharmacy/components/SubmitButton/SubmitButton.module.css";
import { FC } from "react";

interface SubmitButtonProps {
  text?: string;
  onClick?: () => void;
  style?: any;
  className?: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  text,
  onClick,
  style,
  className,
}) => {
  return (
    <button
      type="submit"
      className={`${className} ${styles.loginBtn}`}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <p className="text-white">{text}</p>
    </button>
  );
};

export default SubmitButton;
