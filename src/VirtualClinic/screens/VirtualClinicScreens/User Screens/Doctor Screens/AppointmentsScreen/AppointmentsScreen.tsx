import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/AppointmentsScreen/AppointmentsScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
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
  Dropdown,
  MenuProps,
  notification,
  Modal,
  TimePicker,
  Badge,
} from "antd";
import type {
  ColumnType,
  ColumnsType,
  FilterValue,
  SorterResult,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { createAppointmentAction } from "VirtualClinic/redux/VirtualClinicRedux/CreateAppointment/createAppoinmentAction";
import { getAppointmentsAction } from "VirtualClinic/redux/VirtualClinicRedux/GetAppointments/getAppoinmentsAction";
import { updateAppointmentAction } from "VirtualClinic/redux/VirtualClinicRedux/UpdateAppointment/updateAppointmentAction";
import { deleteAppointmentAction } from "VirtualClinic/redux/VirtualClinicRedux/DeleteAppointment/deleteAppointmentAction";
import { DownOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";

interface DataType {
  patientName: any;
  patientPhone: any;
  doctorName: any;
  date: Date;
  dateStr: string;
  time: string;
  status: string;
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

  const { userData, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  const dispatch: any = useDispatch();

  const data: DataType[] = userAppointments?.map((appointment: any) => {
    const date = moment(appointment?.date);
    const isGuest = appointment.patient?.type === "GUEST";
    return {
      patientName: appointment?.patient?.name,
      patientPhone: isGuest
        ? appointment?.patient?.relationTo +
          "'s " +
          appointment.patient?.relation.toLowerCase()
        : appointment.patient?.mobileNumber,
      doctorName: appointment?.doctor?.name,
      date: date.toDate(),
      dateStr: date.format("dddd, MMMM D, yyyy"),
      time: date.format("h:mm a"),
      status: appointment?.status,
      key: appointment?._id,
    };
  });

  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [followUpModalVisible, setFollowUpModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string>();

  useEffect(() => {
    dispatch(
      getAppointmentsAction({
        id: userData?._id,
        type: userType,
      })
    );
    console.log(userAppointments);
  }, []);

  // useEffect(() => {
  // console.log("userAppointments");
  // console.log(userAppointments);
  // }, [userAppointments]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "UPCOMING":
        return "processing";
      case "CANCELLED":
        return "error";
      case "RESCHEDULED":
        return "warning";
      default:
        return "warning";
    }
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
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      width: "17%",
      ...getColumnSearchProps("patientName"),
      sorter: (a, b) => a.patientName?.localeCompare(b.patientName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Patient Phone",
      dataIndex: "patientPhone",
      key: "patientPhone",
      width: "20%",
      ...getColumnSearchProps("patientPhone"),
    },
    {
      title: "Date",
      dataIndex: "dateStr",
      key: "date",
      width: "25%",
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
        { text: "Upcoming", value: "UPCOMING" },
        { text: "Cancelled", value: "CANCELLED" },
        { text: "Completed", value: "COMPLETED" },
        { text: "Rescheduled", value: "RESCHEDULED" },
      ],
      onFilter: (value: React.Key | boolean, record) =>
        record.status.indexOf(value as string) === 0,
      ellipsis: true,
      render: (text, record) => (
        <Badge
          status={getStatusColor(record.status)}
          text={
            record.status.charAt(0).toUpperCase() +
            record.status.slice(1).toLowerCase()
          }
        />
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (record) => {
        var items = [
          { key: "UPCOMING", label: "Mark as Upcoming" },
          { key: "CANCELLED", label: "Cancel" },
          { key: "COMPLETED", label: "Complete" },
          { key: "RESCHEDULED", label: "Reschedule" },
        ];
        items = items.filter((item) => item.key !== record.status);

        // if completed add a "Schedule a follow up" button
        if (record.status === "COMPLETED") {
          items.push({ key: "FOLLOW_UP", label: "Schedule a Follow Up" });
        }

        return (
          <Dropdown
            menu={{ items, onClick: (item) => onClick(item, record.key) }}
          >
            <a>
              More <DownOutlined />
            </a>
          </Dropdown>
        );
      },
    },
  ];

  const onClick = async (item: any, id: string) => {
    // If it is reschedule, make an antd modal with a date and time picker
    if (item.key === "RESCHEDULED") {
      setSelectedAppointment(id);
      setRescheduleModalVisible(true);
      return;
    }

    // If it is follow up, make an antd modal with a date and time picker
    if (item.key === "FOLLOW_UP") {
      setSelectedAppointment(id);
      setFollowUpModalVisible(true);
      return;
    }

    await dispatch(
      updateAppointmentAction({
        id: id,
        status: item.key,
      })
    );
    notification.open({
      message: "Appointment Status Changed",
      description: `Appointment status changed to ${item.key}`,
      onClick: () => {
        console.log("Notification Clicked!");
      },
      // placement: "bottomRight",
    });

    dispatch(
      getAppointmentsAction({
        id: userData?._id,
        type: userType,
      })
    );
  };

  const [chosenDate, setChosenDate] = useState<Dayjs | null>(null);
  const [chosenTime, setChosenTime] = useState<Dayjs | null>(null);

  const [loadingReschedule, setLoadingReschedule] = useState(false);
  const [loadingFollowUp, setLoadingFollowUp] = useState(false);

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1 className="pageHeading">Appointments</h1>
      <Table dataSource={data} columns={columns} />

      {/* RESCHEDULE */}
      <Modal
        title="Reschedule Appointment"
        open={rescheduleModalVisible}
        onOk={async () => {
          setLoadingReschedule(true);

          // check if the date and time are valid and in the future
          if (!chosenDate || !chosenTime || chosenDate?.isBefore(dayjs())) {
            notification.warning({
              message: "Invalid Date and Time",
              description: `Please choose a valid date and time`,
              onClick: () => {
                console.log("Notification Clicked!");
              },
              // placement: "bottomRight",
            });
            setLoadingReschedule(false);
            return;
          }

          // create another appointment with the same patient and doctor but with the new date and time

          var finalDate = chosenDate?.toDate();
          finalDate.setHours(chosenTime?.hour() || 0);
          finalDate?.setMinutes(chosenTime?.minute() || 0);
          finalDate?.setSeconds(0);
          finalDate?.setMilliseconds(0);

          const appointment = userAppointments?.find(
            (appointment: any) => appointment._id === selectedAppointment
          );

          await dispatch(
            createAppointmentAction({
              doctorId: userData?._id,
              patientId: appointment?.patientId,
              date: finalDate,
              status: "UPCOMING",
              patientType: appointment?.patientType,
            })
          );

          // update the old appointment to be rescheduled
          await dispatch(
            updateAppointmentAction({
              id: selectedAppointment,
              status: "RESCHEDULED",
            })
          );

          dispatch(
            getAppointmentsAction({
              id: userData?._id,
              type: userType,
            })
          );

          notification.success({
            message: "Appointment Rescheduled",
            description: `Appointment rescheduled successfully to ${moment(
              finalDate
            ).format("dddd, MMMM D, yyyy")} at ${moment(finalDate).format(
              "h:mm a"
            )}`,
            onClick: () => {
              console.log("Notification Clicked!");
            },
            // placement: "bottomRight",
          });

          setLoadingReschedule(false);
          setRescheduleModalVisible(false);
        }}
        confirmLoading={loadingReschedule}
        onCancel={() => setRescheduleModalVisible(false)}
      >
        {/* DATE AND TIME PICKER */}
        <p>Choose a date and time for your appointment</p>
        <div className="flex flex-col items-center justify-center">
          <Input
            type="date"
            allowClear
            onChange={(e) => {
              console.log(e.target.value);
              setChosenDate(dayjs(e.target.value));
            }}
          />
          {/* only every 30 minutes */}
          <TimePicker
            minuteStep={30}
            showSecond={false}
            format={"h:mm a"}
            showNow={false}
            allowClear
            onChange={(time, timeString) => {
              console.log(time);
              console.log(timeString);
              setChosenTime(time);
            }}
          />
        </div>
      </Modal>

      {/* SCHEDULE A FOLLOW UP */}
      <Modal
        title="Follow Up Appointment"
        open={followUpModalVisible}
        onOk={async () => {
          setLoadingFollowUp(true);

          // check if the date and time are valid and in the future
          if (!chosenDate || !chosenTime || chosenDate?.isBefore(dayjs())) {
            notification.warning({
              message: "Invalid Date and Time",
              description: `Please choose a valid date and time`,
              onClick: () => {
                console.log("Notification Clicked!");
              },
              // placement: "bottomRight",
            });
            setLoadingFollowUp(false);
            return;
          }

          // create another appointment with the same patient and doctor but with the new date and time

          var finalDate = chosenDate?.toDate();
          finalDate.setHours(chosenTime?.hour() || 0);
          finalDate?.setMinutes(chosenTime?.minute() || 0);
          finalDate?.setSeconds(0);
          finalDate?.setMilliseconds(0);

          const appointment = userAppointments?.find(
            (appointment: any) => appointment._id === selectedAppointment
          );

          await dispatch(
            createAppointmentAction({
              doctorId: userData?._id,
              patientId: appointment?.patientId,
              date: finalDate,
              status: "UPCOMING",
              patientType: appointment?.patientType,
            })
          );

          // // update the old appointment to be rescheduled
          // await dispatch(
          //   updateAppointmentAction({
          //     id: selectedAppointment,
          //     status: "RESCHEDULED",
          //   })
          // );

          dispatch(
            getAppointmentsAction({
              id: userData?._id,
              type: userType,
            })
          );

          notification.success({
            message: "Follow Up Appointment Scheduled",
            description: `for ${
              userAppointments?.find(
                (appointment: any) => appointment._id === selectedAppointment
              )?.patient?.name
            }  on ${moment(finalDate).format("dddd, MMMM D, yyyy")} at ${moment(
              finalDate
            ).format("h:mm a")}`,
            onClick: () => {
              console.log("Notification Clicked!");
            },
            // placement: "bottomRight",
          });

          setLoadingFollowUp(false);
          setFollowUpModalVisible(false);
        }}
        confirmLoading={loadingReschedule}
        onCancel={() => setRescheduleModalVisible(false)}
      >
        {/* DATE AND TIME PICKER */}
        <p>Choose a date and time for your appointment</p>
        <div className="flex flex-col items-center justify-center">
          <Input
            type="date"
            allowClear
            onChange={(e) => {
              console.log(e.target.value);
              setChosenDate(dayjs(e.target.value));
            }}
          />
          {/* only every 30 minutes */}
          <TimePicker
            minuteStep={30}
            showSecond={false}
            format={"h:mm a"}
            showNow={false}
            allowClear
            onChange={(time, timeString) => {
              console.log(time);
              console.log(timeString);
              setChosenTime(time);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentsScreen;
