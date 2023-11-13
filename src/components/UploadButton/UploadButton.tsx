import React, { useEffect, useState, FC } from "react";
import styles from "components/UploadButton/UploadButton.module.css";
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
}

const UploadButton: FC<UploadButtonProps> = ({
  label,
  fileList,
  setFileList,
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
        <label htmlFor="fileInput" className={styles.customLabel}>
          <UploadOutlined />
          {label ?? "Choose Files"}
        </label>
        {fileList?.length > 0 && (
          <Popover
            color="white"
            trigger={["click"]}
            title={
              <div className={`${styles.popover}`}>
                {fileList?.map((file: any) => (
                  <div
                    className={`${styles.uploadedFiles} w-full flex items-center justify-between`}
                  >
                    <p>
                      <PaperClipOutlined />
                      <span>{file.name}</span>
                    </p>
                    <DeleteOutlined
                      onClick={() => handleDelete(file)}
                      className={`${styles.deleteIcon}`}
                    />
                  </div>
                ))}
              </div>
            }
          >
            <InfoCircleOutlined className={styles.infoCircle} />
          </Popover>
        )}
      </div>
    </div>
  );
};

export default UploadButton;
