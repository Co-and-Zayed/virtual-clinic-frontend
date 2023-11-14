import { Input } from "antd";
import styles from "components/InputField/InputField.module.css";
import { FC } from "react";

interface InputFieldProps {
  title: string;
  name?: string;
  isPassword?: boolean;
  type?: string;
  value?: any;
  placeholder?: string;
  suffix?: string;
  status?: "" | "warning" | "error" | undefined;
  error?: any;
  noErrorSection?: boolean;
  onChange?: any;
  className?: string;
  customInput?: any;
  titleColor?: string;
}

const InputField: FC<InputFieldProps> = ({
  title,
  name,
  isPassword,
  type,
  value,
  placeholder,
  suffix,
  status,
  error,
  noErrorSection,
  onChange,
  className,
  customInput,
  titleColor,
}) => {
  return (
    <div
      className="w-full flex flex-col items-start gap-y-2"
      style={{
        color: titleColor || "white",
      }}
    >
      <p className="text-base">{title}</p>
      <div className="w-full">
        {customInput ? (
          customInput
        ) : isPassword ? (
          <Input.Password
            className={`${className} ${styles.inputField}`}
            size="large"
            type="password"
            name={name}
            placeholder={placeholder}
            status={status}
            onChange={onChange}
            value={value}
          />
        ) : (
          <Input
            className={`${className} ${styles.inputField}`}
            size="large"
            name={name}
            type={type}
            placeholder={placeholder}
            suffix={suffix}
            status={status}
            onChange={onChange}
            value={value}
          />
        )}
        {!noErrorSection && (
          <p
            className="h-[1.25rem] text-xs"
            style={{
              lineHeight: "1.2",
              paddingTop: "0.2rem",
              // color: "#dc4446",
              // color: "#315b6b"
              color: "var(--blue)",
              opacity: 0.7,
            }}
          >
            {error?.toString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
