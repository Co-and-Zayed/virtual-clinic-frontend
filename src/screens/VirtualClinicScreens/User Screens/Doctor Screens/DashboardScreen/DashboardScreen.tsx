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
import * as Routes from "Routes/VirtualClinicRoutes/paths";
//import { listAllUsersAction } from "Redux/VirtualClinicRedux/ListAllUsers/listAllUsersAction";



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
  const navigate = useNavigate()
  const [selectedRowKey, setSelectedRowKey] = useState<string>('');
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


  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Doctor Dashboard Screen</h1>
      <h1>My Patients</h1>

      <button className={styles.button} onClick={() => {
                navigate(Routes.DOCTORS_UPCOMING_PATIENTS_PATH, {
                });
              }}>Filter by upcoming appointments
      </button>
      
      <Table
        columns={columns}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [selectedRowKey],
          onSelect: (record: DataType) => handleRowSelect(record),
        }}
        expandable={{
          expandedRowRender: (record) => generateExpandable(record),
          onExpand: (expanded, record) => handleExpand(expanded, record),
        }}
        dataSource={allPatients.map((patient:any, index:any) => ({
          ...patient,
          key: patient.key || index.toString(), // Use index as a fallback key
        }))}
        expandedRowKeys={expandedRowKeys}
      />
    </div>
  );
};

export default DashboardScreen;
