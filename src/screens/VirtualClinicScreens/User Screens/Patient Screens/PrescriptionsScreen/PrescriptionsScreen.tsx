import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { Link } from "react-router-dom";

const PrescriptionsScreen: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const res = await fetch("http://localhost:8000/prescriptions");
      const data = await res.json();

      if (res.ok) {
        setPrescriptions(data);
      }
    };
    fetchPrescriptions();
  }, []);

  interface DataType {
    key: string;
    doctor: string;
    date: string;
    filled: string;
  }

  type DataIndex = keyof DataType;

  const data: DataType[] = prescriptions.map((prescription: any) => {
    return {
      key: prescription._id,
      doctor: prescription.doctorName,
      date: prescription.date.toString().split("T")[0],
      filled: prescription.filled ? "Filled" : "Unfilled",
    };
  });

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

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
    setSearchText('');
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
            style={{ width: 90, backgroundColor: "#1677ff", padding: 0 }}
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
        <div style={{ backgroundColor: "#e6f7ff" }}>{text}</div>
      ) : (
        <div>{text}</div>
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      width: "20%",
      ...getColumnSearchProps("doctor"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "filled",
      key: "filled",
      filters: [
        {
          text: "Filled",
          value: "Filled",
        },
        {
          text: "Unfilled",
          value: "Unfilled",
        },
      ],
      onFilter: (value, record) => {
        return record.filled === value;
      },
      render: (text, record) => {
        let color = record.filled === "Filled" ? "green" : "red";
        return {
          props: {
            style: { color: color },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text : any, record: any) => (
        <Link
          to={`/prescriptions/${record.key}`}
          type="primary"
          style={{
            backgroundColor: "#1677ff",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default PrescriptionsScreen;
