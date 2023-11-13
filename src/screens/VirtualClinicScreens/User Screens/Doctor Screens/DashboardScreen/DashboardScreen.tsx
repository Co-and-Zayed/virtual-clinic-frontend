import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/DashboardScreen/DashboardScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import React from "react";
import type { ColumnsType } from "antd/es/table";
import { listAllPatientsAction } from "redux/VirtualClinicRedux/ListAllPatients/listAllPatientsAction";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button } from "antd";
import * as Routes from "Routes/VirtualClinicRoutes/paths";
import { useFunctions } from "hooks/useFunctions";
import ContractScreen from "../ContractScreen/ContractScreen";
//import { listAllUsersAction } from "redux/VirtualClinicRedux/ListAllUsers/listAllUsersAction";

const DashboardScreen = () => {
  const dispatch: any = useDispatch();
  const { patientsLoading, allPatients } = useSelector(
    (state: RootState) => state.listAllPatientsReducer
  );

  const { userData } = useSelector((state: RootState) => state.userReducer);
  const { handleDownload } = useFunctions();

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
  const navigate = useNavigate();
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

  return <ContractScreen />;
};

export default DashboardScreen;
