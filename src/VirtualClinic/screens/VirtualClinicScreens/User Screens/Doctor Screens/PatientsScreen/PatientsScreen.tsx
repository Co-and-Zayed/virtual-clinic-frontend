import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import React from "react";
import type { ColumnsType } from "antd/es/table";
import { listAllPatientsAction } from "VirtualClinic/redux/VirtualClinicRedux/ListAllPatients/listAllPatientsAction";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, notification } from "antd";

import * as Routes from "VirtualClinic/Routes/VirtualClinicRoutes/paths";
import { useFunctions } from "VirtualClinic/hooks/useFunctions";
//import { listAllUsersAction } from "redux/VirtualClinicRedux/ListAllUsers/listAllUsersAction";

const PatientsScreen = () => {
  const dispatch: any = useDispatch();
  const { patientsLoading, allPatients } = useSelector(
    (state: RootState) => state.listAllPatientsReducer
  );

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { handleDownload } = useFunctions();
  const [healthRecord, setHealthRecord] = useState("");
  const { TextArea } = Input;

  useEffect(() => {
    dispatch(listAllPatientsAction({ doctorUsername: userData?.username })); // sending the request, and update the states
  }, []);

  const generateExpandable = (record: any) => {
    return (
      <div>
        <p>
          <strong>Health Records:</strong> {record.healthRecords}
        </p>
        <p>
          <strong>Mobile Number:</strong> {record.mobileNumber}
        </p>
        <p>
          <strong>Emergency Contact Name:</strong> {record.emergencyContactName}
        </p>
        <p>
          <strong>Emergency Contact Number:</strong>{" "}
          {record.emergencyContactNumber}
        </p>
      </div>
    );
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedKeys, setSelectedKeys] = useState([]);
  const navigate = useNav();
  const [selectedRowKey, setSelectedRowKey] = useState<string>("");
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const handleExpand = (expanded: boolean, record: DataType) => {
    const key = record.key.toString();
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, key]);
    } else {
      setExpandedRowKeys(expandedRowKeys.filter((k) => k !== key));
    }
  };

  const handleRowSelect = (record: DataType) => {
    const key = record.key.toString();
    setSelectedRowKey(key);
    handleExpand(true, record);
  };

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    setSearchText(
      selectedKeys[0] !== undefined ? selectedKeys[0].toString() : ""
    );
    setSearchedColumn(dataIndex);
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    setSearchText("");
    setSearchedColumn("");
    clearFilters();
  };

  const handleResetSearch = () => {
    setSelectedKeys([]); // Clear the selected keys (search value)
    setSearchText(""); // Clear the search text
    setSearchedColumn(""); // Clear the searched column
  };

  interface DataType {
    key: React.Key;
    name: string;
    email: string;
    healthRecords: string;
    date_of_birth: Date;
    gender: string;
    mobileNumber: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
  }

  const columns: ColumnsType<DataType> = [
    Table.SELECTION_COLUMN,
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <input
            placeholder={`Search name`}
            value={
              selectedKeys[0] !== undefined ? selectedKeys[0].toString() : ""
            }
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(selectedKeys, confirm, "name");
              }
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, "name")}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={handleResetSearch}
            size="small"
            style={{ width: 90 }}
          >
            Clear
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        const stringValue = String(value).toLowerCase();
        const name = String(record.name).toLowerCase();
        return name.includes(stringValue);
      },
      filtered: !!searchText,
      render: (text) =>
        searchedColumn === "name" ? (
          <span style={{ backgroundColor: "#ffc069" }}>{text}</span>
        ) : (
          text
        ),
    },
    Table.EXPAND_COLUMN,
    { title: "Email", dataIndex: "email", key: "Email" },
    {
      title: "Date of Birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      render: (date_of_birth: Date) => {
        const date = new Date(date_of_birth);
        return (
          <span>
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </span>
        );
      },
    },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Health Records",
      dataIndex: "healthRecords",
      key: "healthRecords",
    },
    {
      title: "Add Health Record",
      dataIndex: "healthRecord",
      key: "healthRecord",
      render: (text, record: any) => {
        const handleAddHealthRecord = async () => {
          if (healthRecord === "") {
            notification.error({
              message: "Fill The Health Record Field",
            });

            return;
          }

          try {
            const response = await fetch(
              `${process.env.REACT_APP_BACKEND_CLINIC}doctor/addHealthRecordForPatient`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                  patientId: record._id,
                  healthRecord,
                }),
              }
            );

            const data = await response.json();
            console.log("Fetched", data);

            if (response.ok) {
              notification.success({
                message: "Health Record Added Successfully",
              });
            }
          } catch (error) {
            notification.error({
              message: "Failed To Add Health Record",
            });
            console.log(error);
          }
        };

        return (
          <div>
            <TextArea
              placeholder="Enter health record"
              autoSize={false}
              onChange={(e) => {
                setHealthRecord(e.target.value);
              }}
            />
            <Button onClick={handleAddHealthRecord} style={{ marginTop: 8 }}>
              Add Record
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>My Patients</h1>

      {
        <a onClick={() => handleDownload({ files: userData?.doctorDocuments })}>
          Download My Documents
        </a>
      }

      <button
        className={styles.button}
        onClick={() => {
          navigate(Routes.DOCTORS_UPCOMING_PATIENTS_PATH, {});
        }}
      >
        Filter by upcoming appointments
      </button>

      <Table
        columns={columns}
        rowSelection={{
          type: "radio",
          selectedRowKeys: [selectedRowKey],
          onSelect: (record: DataType) => handleRowSelect(record),
        }}
        expandable={{
          expandedRowRender: (record) => generateExpandable(record),
          onExpand: (expanded, record) => handleExpand(expanded, record),
        }}
        dataSource={allPatients?.map((patient: any, index: any) => ({
          ...patient,
          key: patient.key || index.toString(), // Use index as a fallback key
        }))}
        expandedRowKeys={expandedRowKeys}
      />
    </div>
  );
};

export default PatientsScreen;
