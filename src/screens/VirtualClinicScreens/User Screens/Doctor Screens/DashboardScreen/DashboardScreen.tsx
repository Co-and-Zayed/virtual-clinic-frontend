import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/DashboardScreen/DashboardScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/rootReducer";
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { listAllPatientsAction } from "Redux/VirtualClinicRedux/ListAllPatients/listAllPatientsAction";
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, Button } from 'antd';

const DashboardScreen = () => {
  
  const dispatch: any = useDispatch();
  const { patientsLoading, allPatients } = useSelector(
    (state: RootState) => state.listAllPatientsReducer
  );
  useEffect(() => {
    dispatch(listAllPatientsAction({doctor:"jawad@gmail.com"})); // sending the request, and update the states
    console.log(allPatients);
  }, []);
  const generateExpandable = (record:any) => {
    return (
      <div>
        <p><strong>Health Records:</strong> {record.healthRecords}</p>
        <p><strong>Mobile Number:</strong> {record.mobileNumber}</p>
        <p><strong>Emergency Contact Name:</strong> {record.emergencyContactName}</p>
        <p><strong>Emergency Contact Number:</strong> {record.emergencyContactNumber}</p>
      </div>
    );
  };

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [selectedKeys, setSelectedKeys] = useState([]);


  const handleSearch = (selectedKeys:any, confirm:any, dataIndex:any) => {
    setSearchText(selectedKeys[0] !== undefined ? selectedKeys[0].toString() : '');
    setSearchedColumn(dataIndex);
    confirm();
  };

  const handleReset = (clearFilters:any) => {
    setSearchText('');
    setSearchedColumn('');
    clearFilters();
  };

  const handleResetSearch = () => {
    setSelectedKeys([]); // Clear the selected keys (search value)
    setSearchText(''); // Clear the search text
    setSearchedColumn(''); // Clear the searched column
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <input
            placeholder={`Search name`}
            value={selectedKeys[0] !== undefined ? selectedKeys[0].toString() : ''}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(selectedKeys, confirm, 'name');
              }
            }}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, 'name')}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={handleResetSearch} size="small" style={{ width: 90 }}>
            Clear
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) => {
        const stringValue = String(value).toLowerCase();
        const name = String(record.name).toLowerCase();
        return name.includes(stringValue);
      },
      filtered: !!searchText,
      render: (text) =>
        searchedColumn === 'name' ? (
          <span style={{ backgroundColor: '#ffc069' }}>{text}</span>
        ) : (
          text
        ),
    },
    Table.EXPAND_COLUMN,
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { title: 'Date of Birth', dataIndex: 'date_of_birth', key: 'date_of_birth' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Health Records', dataIndex: 'healthRecords', key: 'healthRecords' },
  ];

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const handleExpand = (expanded: boolean, record: DataType) => {
    if (expanded) {
      setExpandedRowKeys([record.key]);
    } else {
      setExpandedRowKeys([]);
    }
  };

  const rowSelection = {
    type: 'radio',
    selectedRowKeys: expandedRowKeys,
    onSelect: (record: DataType) => {
      handleExpand(true, record);
    },
  };

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Doctor Dashboard Screen</h1>
      <h1>My Patients</h1>
      <Table
        columns={columns}
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => generateExpandable(record),onExpand: (expanded, record) => handleExpand(expanded, record),
        }}
        dataSource={allPatients}
        expandedRowKeys={expandedRowKeys}
      />
    </div>
  );
};

export default DashboardScreen;
