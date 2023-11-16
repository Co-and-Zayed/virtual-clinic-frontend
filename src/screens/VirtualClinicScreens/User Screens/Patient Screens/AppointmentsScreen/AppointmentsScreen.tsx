import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/AppointmentsScreen/AppointmentsScreen.module.css";
import inputStyles from "components/InputField/InputField.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  Button,
  Input,
  Space,
  Table,
  InputRef,
  TableProps,
  Popconfirm,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import type {
  ColumnType,
  ColumnsType,
  FilterValue,
  SorterResult,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { createAppointmentAction } from "redux/VirtualClinicRedux/CreateAppointment/createAppoinmentAction";
import { getAppointmentsAction } from "redux/VirtualClinicRedux/GetAppointments/getAppoinmentsAction";
import { updateAppointmentAction } from "redux/VirtualClinicRedux/UpdateAppointment/updateAppointmentAction";
import { deleteAppointmentAction } from "redux/VirtualClinicRedux/DeleteAppointment/deleteAppointmentAction";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import CoolCalendar from "components/CoolCalendar/CoolCalendar";
import SearchButton from "components/SearchButton/SearchButton";
import AppointmentCard from "components/AppointmentCard/AppointmentCard";
import { motion } from "framer-motion";

interface DataType {
  patientName: any;
  doctorName: any;
  date: Date;
  dateStr: string;
  time: string;
  status: string;
  key: string;
}
type DataIndex = keyof DataType;

const AppointmentsScreen = () => {
  const { appointmentLoading, userAppointments } = useSelector(
    (state: RootState) => state.getAppointmentsReducer
  );

  const { userData, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  const dispatch: any = useDispatch();

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState(false);
  const [pastAppointments, setPastAppointments] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const data: DataType[] = userAppointments?.map((appointment: any) => {
    const date = moment(appointment.date);
    return {
      patientName: appointment.patient.name,
      doctorName: appointment.doctor.name,
      date: date.toDate(),
      dateStr: date.format("dddd, D MMMM, yyyy"),
      time: date.format("h:mm a"),
      status: appointment.status,
      key: appointment._id,
    };
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    await dispatch(
      getAppointmentsAction({
        id: userData?._id,
        type: userType,
      })
    );
    console.log(userAppointments);
    updateDaysToHighlight();
  }

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

  const [dateFilter, setDateFilter] = useState<any>(null);
  const [timeFilter, setTimeFilter] = useState<any>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    console.log(selectedKeys[0]);
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

  const columns: ColumnsType<DataType> = [
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
      width: "30%",
      ...getColumnSearchProps("doctorName"),
      sorter: (a, b) => a.doctorName?.localeCompare(b.doctorName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Date",
      dataIndex: "dateStr",
      key: "date",
      width: "30%",
      ...getColumnSearchProps("date"),
      // a.date is of type Date
      sorter: (a, b) => a.date.toString().localeCompare(b.date.toString()),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      ...getColumnSearchProps("time"),
      sorter: (a, b) => a.time?.localeCompare(b.time),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "UPCOMING", value: "UPCOMING" },
        { text: "CANCELED", value: "CANCELLED" },
        { text: "COMPLETED", value: "COMPLETED" },
      ],
      onFilter: (value: React.Key | boolean, record) =>
        record.status.indexOf(value as string) === 0,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={(e) => {
            console.log("delete");
            console.log(e);
          }}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  const [daysToHighlight, setDaysToHighlight] = useState<Dayjs[] | null>(null);

  useEffect(() => {
    console.log("userAppointments useEffect");
    console.log(userAppointments);
    updateDaysToHighlight();
  }, [userAppointments]);

  function updateDaysToHighlight() {
    if (userAppointments) {
      var uniqueDays: dayjs.Dayjs[] = [];
      userAppointments.forEach((app: any) => {
        const date = dayjs(app.date);
        if (!uniqueDays.includes(date)) {
          uniqueDays.push(date);
        }
      });
      setDaysToHighlight(uniqueDays);
    }
  }
  function getFilteredAppointments() {
    var filteredAppointments;
    if (selectedDate) {
      filteredAppointments = userAppointments?.filter((app: any) => {
        const date = dayjs(app.date);
        return date.isSame(selectedDate, "day");
      });
    } else if (upcomingAppointments || pastAppointments) {
      filteredAppointments = userAppointments;
    } else {
      return <p className="text-2xl">Select a date</p>;
    }

    if (dateFilter) {
      filteredAppointments = filteredAppointments?.filter((app: any) => {
        const date = dayjs(app.date);
        return date.isSame(dateFilter, "day");
      });
    }

    if (timeFilter) {
      filteredAppointments = filteredAppointments?.filter((app: any) => {
        const date = dayjs(app.date);
        return date.isSame(timeFilter, "minute");
      });
    }

    if (upcomingAppointments) {
      filteredAppointments = filteredAppointments?.filter((app: any) => {
        const date = dayjs(app.date);
        return date.isAfter(dayjs());
      });
    }

    if (pastAppointments) {
      filteredAppointments = filteredAppointments?.filter((app: any) => {
        const date = dayjs(app.date);
        return date.isBefore(dayjs());
      });
    }

    if (selectedStatus) {
      filteredAppointments = filteredAppointments?.filter((app: any) => {
        return app.status === selectedStatus;
      });
    }

    // Write the date of the different days in the list of filtered appointments before each different day
    var components: any[] = [];
    var prevDate = "";
    var idx = 0;
    filteredAppointments?.forEach((app: any) => {
      const date = dayjs(app.date);
      if (date.format("dddd, D MMMM, YYYY") !== prevDate) {
        components.push(
          // border bottom
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.38, 0.01, 0.39, 1.1],
              delay: idx * 0.08,
            }}
            className="w-full flex items-center justify-start pb-2 mb-3 border-b-2 border-gray-300"
          >
            <p className="text-2xl font-semibold">
              {date.format("dddd, D MMMM, YYYY")}
            </p>
          </motion.div>
        );
        prevDate = date.format("dddd, D MMMM, YYYY");
        idx++;
      }
      components.push(
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.38, 0.01, 0.39, 1.1],
            delay: idx * 0.1,
          }}
        >
          <AppointmentCard appointment={app} />
        </motion.div>
      );
      idx++;
    });

    return components;
  }

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1 className="pageHeading" style={{ marginBottom: 0 }}>
        Appointments
      </h1>
      {/* <Table dataSource={data} columns={columns} /> */}

      <div className="w-full flex items-start justify-center gap-x-16">
        {/* Calendar */}
        <div
          style={{
            transform: "scale(1.2)",
            marginTop: "7rem",
          }}
        >
          <CoolCalendar
            selectedDate={selectedDate}
            setSelectedDate={(date: Dayjs | null) => {
              setSelectedDate(date);
              setPastAppointments(false);
              setUpcomingAppointments(false);
            }}
            daysToHighlight={daysToHighlight ?? []}
            loading={appointmentLoading}
          />
        </div>

        {/* Appointments */}
        <div className="flex flex-col items-center justify-start gap-y-4">
          <div className="w-full flex items-center justify-start gap-x-2">
            {/* PAST & UPCOMING */}
            <div className="w-full flex items-center justify-start gap-x-2">
              <Button
                className={`
                  ${
                    pastAppointments ? styles.filterBtnActive : styles.filterBtn
                  }
                `}
                onClick={() => {
                  setPastAppointments((past) => {
                    if (!past) {
                      setUpcomingAppointments(false);
                      setSelectedDate(null);
                    }
                    return !past;
                  });
                }}
              >
                Past
              </Button>
              <Button
                className={`
                  ${
                    upcomingAppointments
                      ? styles.filterBtnActive
                      : styles.filterBtn
                  }`}
                onClick={() => {
                  setUpcomingAppointments((upcoming) => {
                    if (!upcoming) {
                      setPastAppointments(false);
                      setSelectedDate(null);
                    }
                    return !upcoming;
                  });
                }}
              >
                Upcoming
              </Button>
            </div>

            {/* FILTER BY STATUS (upcoming, completed, cancelled, rescheduled) */}
            {/* dropdown containing these values with allow clear */}
            <Select
              className={`${inputStyles.lightInputField}`}
              style={{ width: "12rem" }}
              placeholder="Filter by Status"
              options={
                [
                  { value: "UPCOMING", label: "Upcoming" },
                  { value: "COMPLETED", label: "Completed" },
                  { value: "CANCELLED", label: "Cancelled" },
                  { value: "RESCHEDULED", label: "Rescheduled" },
                ] as any
              }
              allowClear
              onChange={(value) => {
                setSelectedStatus(value);
              }}
            />
          </div>
          {/* FILTERS */}
          <div className={`flex gap-x-2`}>
            <DatePicker
              format={"DD/MM/YYYY"}
              value={dateFilter}
              onChange={(value) => {
                setDateFilter(value);
              }}
              allowClear
              placeholder="Select date for appointment"
              className={`${inputStyles.lightInputField}`}
              style={{
                width: "15rem",
              }}
            />

            <TimePicker
              className={`${inputStyles.lightInputField}`}
              format={"hh:mm a"}
              onSelect={(value) => {
                setTimeFilter(value);
              }}
              onChange={(value) => {
                setTimeFilter(value);
              }}
              value={timeFilter}
              allowClear
              style={{
                width: "12rem",
              }}
            />

            {/* APPLY FILTERS */}
            <SearchButton
              // noSearchIcon
              // text="Apply"
              onClick={() => {
                // filterDoctors();
              }}
            />
          </div>

          {/* APPOINTMENTS */}
          {/* display appointment card for each appointment on selected date (sorted ascendingly by time) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col items-center justify-start gap-y-4 mt-2"
            style={{
              height: "calc(100vh - 15rem)",
              overflowY: "auto",
            }}
          >
            {getFilteredAppointments()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsScreen;
