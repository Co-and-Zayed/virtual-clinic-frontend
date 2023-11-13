import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/DashboardScreen/DashboardScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import React from "react";
import {
  Input,
  notification,
  Table,
  InputRef,
  Space,
  Button,
  Badge,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { listAllContractsAction } from "redux/VirtualClinicRedux/ListAllContracts/listAllContractsAction";
import type {
  ColumnType,
  ColumnsType,
  FilterValue,
  SorterResult,
  FilterConfirmProps,
} from "antd/es/table/interface";
import * as Routes from "Routes/VirtualClinicRoutes/paths";
import { useFunctions } from "hooks/useFunctions";
//import { listAllUsersAction } from "redux/VirtualClinicRedux/ListAllUsers/listAllUsersAction";

const DashboardScreen = () => {
  const dispatch: any = useDispatch();
  const { allContracts } = useSelector(
    (state: RootState) => state.listAllContractsReducer
  );

  const { userData } = useSelector((state: RootState) => state.userReducer);
  const { handleDownload } = useFunctions();

  useEffect(() => {
    dispatch(listAllContractsAction({ doctorUsername: userData?.username })); // sending the request, and update the states
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

  const handleContractRequest = async (ID: any, values: any) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}doctor/${values}Contract`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          _id: ID,
        }),
      }
    );
    dispatch(listAllContractsAction());
    const data = await res.json();
    notification.success({
      message: "Contract Status Updated Successfully",
      placement: "topRight",
    });
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "success";
      case "PENDING":
        return "processing";
      case "REJECTED":
        return "error";
      case "EXPIRED":
        return "warning";
      default:
        return "warning";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "Accepted";
      case "PENDING":
        return "Pending";
      case "REJECTED":
        return "Rejected";
      case "EXPIRED":
        return "Expired";
      default:
        return "Pending";
    }
  };

  interface DataType {
    key: React.Key;
    doctorUsername: string;
    date: string;
    endDate: string;
    hourlyRate: Number;
    clinicRate: Number;
    status: string;
  }

  type DataIndex = keyof DataType;

  const data: DataType[] = allContracts?.map((contract: any) => {
    const formatDate = (dateString: string): string => {
      const [year, month, day] = dateString.split("T")[0].split("-");
      return `${day}/${month}/${year}`;
    };
    return {
      doctorUsername: contract.doctorUsername,
      date: formatDate(contract.date),
      endDate: formatDate(contract.endDate),
      hourlyRate: contract.hourlyRate,
      clinicRate: contract.clinicRate,
      status: contract.status,
      key: contract._id,
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "doctorUsername",
      key: "name",
      ...getColumnSearchProps("doctorUsername"),
      sorter: (a, b) => a.doctorUsername.localeCompare(b.doctorUsername),
      sortDirections: ["descend", "ascend"],
    },

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
    {
      title: "Action",
      dataIndex: "",
      key: "delete",
      render: (record) => (
        <Space>
          <Space>
            <a onClick={() => handleContractRequest(record.key, "accept")}>
              Accept
            </a>
          </Space>
          <Space>
            <a onClick={() => handleContractRequest(record.key, "reject")}>
              Reject
            </a>
          </Space>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log("Sending Request");
    dispatch(listAllContractsAction());
  }, []);

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>My Contracts</h1>

      {
        <a onClick={() => handleDownload({ files: userData?.doctorDocuments })}>
          Download My Documents
        </a>
      }

      <button
        className={styles.button}
        onClick={() => {
          navigate(Routes.VIEW_CONTRACT_PATH, {});
        }}
      >
        Filter by upcoming appointments
      </button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default DashboardScreen;
