import styles from "Pharmacy/components/Modal/Modal.module.css";
import React, { FC, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";

interface ModalProps {
  setCloseState: any;
  className?: string;
  children: React.ReactNode;
  onClose?: any;
}

const Modal: FC<ModalProps> = ({
  children,
  setCloseState,
  className,
  onClose,
}) => {
  // if (!isOpen) return null;

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(true);
  });

  const MODAL_STYLES: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",

    backgroundColor: "#FFF",
    padding: "3rem",
    paddingTop: "4rem",
    borderRadius: "1rem",

    transition: "opacity 0.25s ease-out",
    opacity: open ? 1 : 0,
    zIndex: 1000,

    overflow: "auto",
  };

  const OVERLAY_STYLES: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    transition: "opacity 0.25s ease-out",
    opacity: open ? 1 : 0,
    zIndex: 1000,
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}></div>
      <div className={className} style={MODAL_STYLES}>
        <CloseOutlined
          style={{
            position: "absolute",
            top: "1.75rem",
            right: "1.75rem",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={() => {
            onClose();
            setOpen(false);
            setCloseState(false);
          }}
        ></CloseOutlined>
        {children}{" "}
      </div>
    </>,
    document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
