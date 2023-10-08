import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/AppointmentsScreen/AppointmentsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, InputRef,TableProps, Popconfirm} from 'antd';
import type { ColumnType, ColumnsType, FilterValue, SorterResult, FilterConfirmProps } from 'antd/es/table/interface';
import { createAppointmentAction } from "redux/VirtualClinicRedux/CreateAppointment/createAppoinmentAction";
import { getAppointmentsAction } from "redux/VirtualClinicRedux/GetAppointments/getAppoinmentsAction";
import { updateAppointmentAction } from "redux/VirtualClinicRedux/UpdateAppointment/updateAppointmentAction";
import { deleteAppointmentAction } from "redux/VirtualClinicRedux/DeleteAppointment/deleteAppointmentAction";

interface DataType {
  patientEmail: string;
  doctorEmail: string;
  date: string;
  time: string;
  status: string
  key: string;
}
type DataIndex = keyof DataType;

const AppointmentsScreen = () => {

  // const { addingFamMemLoading, confirm } = useSelector(
  //   (state: RootState) => state.createAppointmentReducer
  // );
  
  const { appointmentLoading, userAppointments } = useSelector(
    (state: RootState) => state.getAppointmentsReducer
    );

  const dispatch : any = useDispatch();

  const data: DataType[] =                
  userAppointments?.map((appointment: any) => (
  {
    patientEmail: appointment.patientEmail,      
    doctorEmail: appointment.doctorEmail,
    date: (new Date(appointment.date)).toLocaleDateString(),
    time: appointment.time,
    status: appointment.status,
    key: appointment._id,
  }
  ));

  useEffect(() => {
    dispatch(getAppointmentsAction(
      {
        email: "Seif",
        type: "PATIENT"
      }
      ));
      console.log(userAppointments);
}, []);
  
  // const data: DataType[] = [
  //   {
  //     patientEmail: "Ali@gmail.com",
  //     doctorEmail: "Dr.Wael@gmail.com",
  //     date: "2023-10-06",
  //     time:"12:00:00pm",
  //     status: "COMPLETED",
  //     key: "1",
  //   },
  //   {
  //     patientEmail: "Omar@gmail.com",
  //     doctorEmail: "Dr.Ahmed@gmail.com",
  //     date: "2023-10-10",
  //     time:"05:00:00pm",
  //     status: "UPCOMING",
  //     key: "2",
  //   },
  //   {
  //     patientEmail: "Hatem@gmail.com",
  //     doctorEmail: "Dr.Medhat@gmail.com",
  //     date: "2023-10-12",
  //     time:"08:00:00am",
  //     status: "CANCELLED",
  //     key: "3",
  //   },
  //   {
  //     patientEmail: "Hazem@gmail.com",
  //     doctorEmail: "Dr.Medhat@gmail.com",
  //     date: "2023-10-12",
  //     time:"10:30:00pm",
  //     status: "CANCELLED",
  //     key: "4",
  //   },
  //   {
  //     patientEmail: "Hatem@gmail.com",
  //     doctorEmail: "Dr.Zo3nof@gmail.com",
  //     date: "2023-10-12",
  //     time:"03:00:00pm",
  //     status: "COMPLETED",
  //     key: "5",
  //   },
  //   {
  //     patientEmail: "Seif.Naguib@gmail.com",
  //     doctorEmail: "Dr.Zo3nof@gmail.com",
  //     date: "2023-10-12",
  //     time:"1:00:00pm",
  //     status: "COMPLETED",
  //     key: "6",
  //   }, 
  // ];

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
    console.log(selectedKeys[0])
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
      title: 'Doctor Email',
      dataIndex: 'doctorEmail',
      key: 'doctorEmail',
      width: '30%',
      ...getColumnSearchProps('doctorEmail'),
      sorter: (a, b) => a.doctorEmail?.localeCompare(b.doctorEmail),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '50%',
      ...getColumnSearchProps('date'),
      sorter: (a, b) => a.date?.localeCompare(b.date),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      ...getColumnSearchProps('time'),
      sorter: (a, b) => a.time?.localeCompare(b.time),
      sortDirections: ['descend', 'ascend'],

    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'UPCOMING', value: 'UPCOMING' },
        { text: 'CANCELED', value: 'CANCELLED' },
        { text: 'COMPLETED', value: 'COMPLETED' },
      ],
      onFilter: (value: React.Key | boolean, record) => record.status.indexOf(value as string) === 0,    
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <Popconfirm title="Sure to delete?">
      <a>Delete</a>
    </Popconfirm>
    },
  ];

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Patient Appointments Screen</h1>
      <Table 
        dataSource={data}
        columns={columns}
      />
    </div>
)};
  

export default AppointmentsScreen;