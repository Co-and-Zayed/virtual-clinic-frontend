import styles from "Pharmacy/screens/User Screens/Pharmacist Screens/DashboardScreen/DashboardScreen.module.css";
import { useNav } from "Pharmacy/hooks/useNav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import React from "react";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button } from "antd";
import * as Routes from "Pharmacy/Routes/PharmacyRoutes/paths";
import ContractScreen from "../ContractScreen/ContractScreen";
//import { listAllUsersAction } from "Pharmacy/redux/PharmacyRedux/ListAllUsers/listAllUsersAction";

const DashboardScreen = () => {
  const { userData } = useSelector((state: RootState) => state.userReducer);

  return userData?.status === "WAITING" || userData?.status === "ACCEPTED" ? (
    <ContractScreen />
  ) : userData?.status === "PENDING" ? (
    <p>Your documents are being reviewed</p>
  ) : (
    <p>Error 404</p>
  );
};

export default DashboardScreen;
