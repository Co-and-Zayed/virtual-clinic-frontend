import styles from "Pharmacy/screens/User Screens/Patient Screens/OrderScreen/OrderScreen.module.css";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useEffect, useState } from "react";
import { FETCH_ORDERS, CANCEL_ORDER } from "Pharmacy/redux/PharmacyRedux/types";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, DatePicker } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import moment from "moment";
import JellyLoader from "Pharmacy/components/JellyLoader/JellyLoader";
import { UPDATE_USER_DATA } from "Pharmacy/redux/User/loginTypes";

const OrderScreen = () => {
  const { accessToken } = useSelector((state: RootState) => state.userReducer);
  const { orders } = useSelector((state: RootState) => state.ordersReducer);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_PHARMACY}orderAPI/getOrders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        dispatch({ type: "FETCH_ORDERS", payload: data.orders.reverse() });
      }
    } catch (error) {}
  };

  const handleOnClick = async (id: any) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_PHARMACY}orderAPI/cancelOrder/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.user) {
        dispatch({
          type: UPDATE_USER_DATA,
          payload: data.user,
        });

        dispatch({ type: "CANCEL_ORDER", payload: data.order });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getOrder();
  }, [dispatch]);

  interface DataType {
    key: string;
    date: string;
    price: string;
    paymentMethod: string;
    status: string;
    cartDetails: any;
  }

  interface ExpandedDataType {
    medicine: string;
    quantity: number;
  }

  const expandedRowRender = (record: DataType) => {
    const columns: ColumnType<ExpandedDataType>[] = [
      { title: "Medicine", dataIndex: "medicine", key: "medicine" },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ];

    const data: ExpandedDataType[] = record.cartDetails.map((item: any) => {
      return {
        medicine: item.medicine,
        quantity: item.quantity,
      };
    });

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const data: DataType[] = orders?.map((order: any) => {
    return {
      key: order?._id,
      date: order?.date.toString().split("T")[0],
      price: `${order?.totalPrice} EGP`,
      paymentMethod: order?.paymentMethod,
      status: order?.status,
      cartDetails: order?.cartDetails,
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Button
          disabled={record.status === "CANCELLED"}
          onClick={() => handleOnClick(record.key)}
        >
          Cancel Order
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="pageHeading">Orders</h1>
      <div>
        {loading ? (
          <JellyLoader />
        ) : (
          <Table
            columns={columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            dataSource={data}
          />
        )}
      </div>
    </div>
  );
};

export default OrderScreen;
