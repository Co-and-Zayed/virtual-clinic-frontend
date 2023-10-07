import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/FamilyMembersScreen/FamilyMembersScreen.module.css"

import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, InputRef} from 'antd';
import type { ColumnType, ColumnsType, FilterValue, SorterResult, FilterConfirmProps } from 'antd/es/table/interface';

interface DataType {
  name: string;
  nationalID: string;
  age: Number;
  gender: string;
  relationship: string
  key: string;
}

type DataIndex = keyof DataType;

const FamilyMembersScreen = () => {

  const data: DataType[] = [
    {
      name: 'Ali',
      nationalID: "123456",
      age: 5,
      gender:"M",
      relationship: "CHILD",
      key: "1",
    },
    {
      name: "Wael",
      nationalID: "12345678",
      age: 50,
      gender:"M",
      relationship: "HUSBAND",
      key: "2",
    },
    {
      name: "Lara",
      nationalID: "11111111111111",
      age: 23,
      gender:"F",
      relationship: "WIFE",
      key: "3",
    },
    {
      name: "Malek",
      nationalID: "2345678",
      age: 21,
      gender:"M",
      relationship: "Husband",
      key: "4",
    },
  ];

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'National ID',
      dataIndex: 'nationalID',
      key: 'nationalID',
      width: '50%',
      ...getColumnSearchProps('nationalID'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      ...getColumnSearchProps('age'),
      sorter: (a, b) => parseInt(a.age.toString()) - parseInt(b.age.toString()),
      sortDirections: ['descend', 'ascend'],

    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      filters: [
        { text: 'M', value: 'M' },
        { text: 'F', value: 'F' },
      ],
      onFilter: (value: React.Key | boolean, record) => record.gender.indexOf(value as string) === 0,    
      ellipsis: true,
    },
    {
      title: 'Relationship',
      dataIndex: 'relationship',
      key: 'relationship',
      filters: [
        { text: 'HUSBAND', value: 'HUSBAND' },
        { text: 'WIFE', value: 'WIFE' },
        { text: 'CHILD', value: 'CHILD' },
      ],
      onFilter: (value: React.Key | boolean, record) => record.relationship.indexOf(value as string) === 0,    
      ellipsis: true,
    },
  ];

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Patient's Family Members Screen</h1>
      <Table 
        dataSource={data}
        columns={columns}
        onChange={clearFilters}></Table>
    </div>
  );
};

export default FamilyMembersScreen;