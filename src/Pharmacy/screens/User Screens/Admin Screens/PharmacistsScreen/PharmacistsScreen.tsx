import styles from "Pharmacy/screens/User Screens/Admin Screens/PharmacistsScreen/PharmacistsScreen.module.css";
import { useNav } from "Pharmacy/hooks/useNav";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import React from "react";
import type {
  ColumnType,
  ColumnsType,
  FilterValue,
  SorterResult,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import {
  Input,
  notification,
  Spin,
  Table,
  InputRef,
  Space,
  Button,
  Badge,
  Dropdown,
  Menu,
  MenuProps,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { adminListAllPharmacistsAction } from "Pharmacy/redux/PharmacyRedux/AdminListAllPharmacists/adminListAllPharmacistsAction";
import { deletePharmacistAction } from "Pharmacy/redux/PharmacyRedux/DeletePharmacist/deletePharmacistAction";

import JellyLoader from "Pharmacy/components/JellyLoader/JellyLoader";
import { viewPharmacists } from "Pharmacy/api/PharmacyRedux/apiUrls";
import { get } from "http";

interface DataType {
  name: string;
  username: string;
  email: string;
  affiliation: string;
  specialty: string;
  educationalBackground: string;
  hourlyRate: Number;
  status: string;
  key: string;
}

type DataIndex = keyof DataType;

const PharmacistsScreen = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const dispatch: any = useDispatch();

  const [showPharmacistDetails, setShowPharmacistDetails] = useState(false);
  const [currentPharmacist, setCurrentPharmacist] = useState<any>();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

  const { adminPharmacistsLoading, adminPharmacists } = useSelector(
    (state: RootState) => state.adminListAllPharmacistsReducer
  );

  const handleDeleteClick = async (username: any) => {
    await dispatch(deletePharmacistAction({ username: username }));
    await dispatch(adminListAllPharmacistsAction());
    notification.success({
      message: "Pharmacist deleted Successfully",
      placement: "topRight",
    });
    setShowPharmacistDetails(false);
    setCurrentPharmacist(null);
  };

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.userReducer
  );

  const handlePharmacistRequest = async (username: any, values: any) => {
    if (values === "accept") {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_PHARMACY}adminAPI/sendContract`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            username: username,
          }),
        }
      );
    }
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_PHARMACY}adminAPI/${values}Pharmacist`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          username: username,
        }),
      }
    );
    dispatch(adminListAllPharmacistsAction());
    const data = await res.json();
    notification.success({
      message: "Pharmacist Status Updated Successfully",
      placement: "topRight",
    });
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "success";
      case "PENDING":
        return "warning";
      case "REJECTED":
        return "error";
      case "WAITING":
        return "processing";
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
      case "WAITING":
        return "Waiting";
      default:
        return "Pending";
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
      sorter: (a, b) => a.username.localeCompare(b.username),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Affiliation",
      dataIndex: "affiliation",
      key: "affiliation",
      ...getColumnSearchProps("affiliation"),
      sorter: (a, b) => a.affiliation.localeCompare(b.affiliation),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
      ...getColumnSearchProps("specialty"),
      sorter: (a, b) => a.specialty.localeCompare(b.specialty),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Educational Background",
      dataIndex: "educationalBackground",
      key: "educationalBackground",
      ...getColumnSearchProps("educationalBackground"),
      sorter: (a, b) =>
        a.educationalBackground.localeCompare(b.educationalBackground),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Hourly Rate",
      dataIndex: "hourlyRate",
      key: "hourlyRate",
      ...getColumnSearchProps("hourlyRate"),
      sorter: (a, b) =>
        parseInt(a.hourlyRate.toString()) - parseInt(b.hourlyRate.toString()),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      defaultFilteredValue: ["PENDING"],
      filters: [
        { text: "Accepted", value: "ACCEPTED" },
        { text: "Pending", value: "PENDING" },
        { text: "Rejected", value: "REJECTED" },
        { text: "Waiting", value: "WAITING" },
      ],
      onFilter: (value: React.Key | boolean, record) =>
        record.status.indexOf(value as string) === 0,
      ellipsis: true,
      render: (text, record) => (
        <Badge
          status={getStatusColor(record.status)}
          text={getStatusText(record.status)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "delete",
      render: (record) => (
        <Space>
          <Space>
            <a
              onClick={() => handlePharmacistRequest(record.username, "accept")}
            >
              Accept
            </a>
          </Space>
          <Space>
            <a
              onClick={() => handlePharmacistRequest(record.username, "reject")}
            >
              Reject
            </a>
          </Space>
          <Space>
            <a onClick={() => handleDeleteClick(record.username)}>Delete</a>
          </Space>
        </Space>
      ),
    },
  ];

  const data: DataType[] = adminPharmacists?.map((user: any) => ({
    name: user.name,
    email: user.email,
    username: user.username,
    affiliation: user.affiliation,
    specialty: user.specialty,
    educationalBackground: user.educationalBackground,
    hourlyRate: user.hourlyRate,
    status: user.status,
    key: user._id,
  }));

  useEffect(() => {
    console.log("Sending Request");
    dispatch(adminListAllPharmacistsAction());
    setShowPharmacistDetails(false);
    setCurrentPharmacist(null);
    console.log("All Pharmacists", adminPharmacists);
  }, []);

  return (
    <div
      className={`w-full flex flex-col flex-wrap items-start justify-center pb-24`}
    >
      {adminPharmacistsLoading ? (
        <div className={`${styles.spinnerContainer}`}>
          <JellyLoader />
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-start items-center">
          {Array.isArray(adminPharmacists) &&
            adminPharmacists?.map((currPharmacist: any) => (
              <div
                key={currPharmacist._id}
                className={`${styles.packageItem} mt-5 mr-5`}
                onClick={() => {
                  setCurrentPharmacist(currPharmacist);
                  setShowPharmacistDetails(true);
                }}
              >
                <div className="w-full flex justify-between items-center mb-2">
                  <h1
                    style={
                      currPharmacist?.name === currentPharmacist?.name
                        ? { color: "green" }
                        : {}
                    }
                  >
                    {currPharmacist?.name}
                  </h1>
                  {/* <p className={`${styles.editLink}`}>Edit</p> */}
                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={() => handleDeleteClick(currPharmacist?.username)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p>Email: {currPharmacist?.email}</p>
                  {/* If status is PENDING show pending in a rounded container */}
                  {currPharmacist?.status &&
                    currPharmacist?.status === "PENDING" && (
                      <div
                        className={`flex justify-center items-center rounded-md bg-yellow-100 px-2 py-1`}
                      >
                        <p>Pending</p>
                      </div>
                    )}
                </div>
              </div>
            ))}
        </div>
      )}
      {showPharmacistDetails && (
        <div className="mt-12">
          <h1>{currentPharmacist?.name}</h1>
          <p>Email: {currentPharmacist?.email}</p>
          <p>Speciality: {currentPharmacist?.specialty}</p>
          <p>Affiliation: {currentPharmacist?.affiliation}</p>
          <p>
            Educational Background: {currentPharmacist?.educationalBackground}
          </p>
          <p>Hourly rate: EGP {currentPharmacist?.hourlyRate} / hr</p>
        </div>
      )}
      <br />
      <div>
        <Table
          columns={columns}
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <p style={{ margin: 0 }}>
          //       <a onClick={()=> {handleDownload(
          //         {files: record.doctorDocuments}
          //       )} }>Download Documents</a>
          //     </p>
          //   ),
          //   rowExpandable: (record) => record.name !== "Not Expandable",
          // }}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default PharmacistsScreen;
