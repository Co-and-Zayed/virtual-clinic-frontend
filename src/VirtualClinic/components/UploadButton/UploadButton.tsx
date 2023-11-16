import React, { useEffect, useState, FC } from "react";
import styles from "VirtualClinic/components/UploadButton/UploadButton.module.css";
import {
  UploadOutlined,
  PaperClipOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Popover, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";

interface UploadButtonProps {
  fileList: any[];
  setFileList: any;
  label?: string;
  variant?: "LIGHT_GREEN" | "DARK_GREEN";
  listType?: "INFO_CIRCLE" | "VERTICAL";
}

const UploadButton: FC<UploadButtonProps> = ({
  label,
  fileList,
  setFileList,
  variant = "LIGHT_GREEN",
  listType = "INFO_CIRCLE",
}) => {
  useEffect(() => {
    console.log("UPLOADED FILES", fileList);
    fileList?.map((file: any) => {
      console.log(file?.name);
    });
  }, [fileList]);

  const handleDelete = (file: any) => {
    setFileList((prev: any) => prev.filter((item: any) => item !== file));
  };

  const renderFiles = () => {
    return fileList?.map((file: any) => (
      <div
        className={`${styles.uploadedFiles} w-full flex items-center justify-between`}
      >
        <p>
          <PaperClipOutlined />
          <span>{file?.name ?? file.split("$__$")[1]}</span>
        </p>
        <DeleteOutlined
          onClick={() => handleDelete(file)}
          className={`${styles.deleteIcon}`}
        />
      </div>
    ));
  };

  return (
    <div>
      {/* create input to uploaf multiple files */}
      <input
        id="fileInput"
        style={{ display: "none" }}
        type="file"
        multiple
        onChange={(e) => {
          setFileList((prev: any) => [
            ...prev,
            ...(e.target.files ? Array.from(e.target.files) : []),
          ]);
        }}
      />
      <div
        className={`flex justify-between items-center ${styles.labelContainer}`}
      >
        <label
          htmlFor="fileInput"
          className={`${styles.customLabel} ${
            variant === "LIGHT_GREEN"
              ? styles.customLabelLight
              : styles.customLabelDark
          }`}
        >
          <UploadOutlined />
          {label ?? "Choose Files"}
        </label>
        {fileList?.length > 0 && (
          <Popover
            color="white"
            trigger={["click"]}
            title={<div className={`${styles.popover}`}>{renderFiles()}</div>}
          >
            {listType === "INFO_CIRCLE" && (
              <InfoCircleOutlined
                className={`${styles.infoCircle} ${
                  variant === "LIGHT_GREEN"
                    ? styles.infoCircleLight
                    : styles.infoCircleDark
                }`}
              />
            )}
          </Popover>
        )}
      </div>
      {listType === "VERTICAL" && (
        <div className="mt-3 w-[fit-content]">{renderFiles()}</div>
      )}
    </div>
  );
};

export default UploadButton;
