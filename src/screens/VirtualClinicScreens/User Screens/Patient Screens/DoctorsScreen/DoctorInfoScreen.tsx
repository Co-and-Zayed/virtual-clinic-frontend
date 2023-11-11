import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen.module.css";
import inputStyles from "components/InputField/InputField.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { RootState } from "redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Input,
  Select,
  Spin,
  notification,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import { patientGetDoctorsAction } from "redux/VirtualClinicRedux/PatientGetDoctors/patientGetDoctorsAction";
// import { allSpecialitiesAction } from "redux/VirtualClinicRedux/Dropdowns/AllSpecialities/allSpecialitiesAction";
// import { patientSearchDoctorsAction } from "redux/VirtualClinicRedux/PatientSearchDoctors/patientSearchDoctorsAction";
import { getDoctorInfoAction } from "redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import JellyLoader from "components/JellyLoader/JellyLoader";
import DoctorCard from "components/DoctorCard/DoctorCard";
import { motion } from "framer-motion";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import Badge from "@mui/material/Badge";
import { BackIcon, RightArrowIcon } from "assets/IconComponents";
import InputField from "components/InputField/InputField";
import PaymentMethod from "./PaymentScreens/PaymentMethod";
import PayWithCard from "./PaymentScreens/PayWithCard";
import ConfirmationScreen from "./PaymentScreens/ConfirmationScreen";
import RoundedButton from "components/RoundedButton/RoundedButton";
import PayWithWallet from "./PaymentScreens/PayWithWallet";
import { createAppointmentAction } from "redux/VirtualClinicRedux/CreateAppointment/createAppoinmentAction";

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs();

const DoctorInfoScreen = () => {
  //const { name } = useParams<{ name: string }>();   //name of dr
  const dispatch: any = useDispatch();

  const { userData } = useSelector((state: RootState) => state.userReducer);

  var { doctorLoading, docinfo } = useSelector(
    (state: RootState) => state.getDoctorInfoReducer
  );

  const { x, y } = useSelector(
    (state: RootState) => state.getDoctorCardCoordsReducer
  );

  const navigate = useNavigate();

  // booking, paymentMethod, wallet, card, confirmation
  const [page, setPage] = useState("booking");

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const [timeSlots, setTimeSlots] = useState<any>(generateTimeSlots());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);

  const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  useEffect(() => {
    document.title = "El7a2ni" + (docinfo && " | " + docinfo.name);

    dispatch(getDoctorInfoAction({ username: username }));
  }, []);

  useEffect(() => {
    if (docinfo) {
      console.log("Doctor: ");
      console.log(docinfo);
    }
  }, [docinfo]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays([
          // today and tomorrow
          ...daysToHighlight,
          dayjs("23/10/2023", "DD/MM/YYYY").date(),
          dayjs().add(1, "day").date(),
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? (
            <div
              className={`w-[0.4rem] h-[0.4rem] rounded-full`}
              style={{ backgroundColor: "rgba(255, 56, 56, 1)" }}
            />
          ) : undefined
        }
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          style={{
            fontFamily: "Cabin",
            fontWeight: 400,
            // color: "var(--dark-green)",
            color: "rgba(22, 59, 69, 1)",
            opacity: !isSelected ? 0.5 : 1,
          }}
        />
      </Badge>
    );
  }

  function generateTimeSlots(): any {
    // all time from 9 am to 5 pm with 30 min interval
    let timeSlots = [];
    let hour = 9;
    let minute = 0;
    let ampm = "AM";
    let time = "";
    let timeSlot = {};

    for (let i = 0; i < 16; i++) {
      if (minute === 60) {
        hour++;
        minute = 0;
      }

      if (hour === 12 && minute === 0) {
        ampm = "PM";
      }

      if (hour === 13) {
        hour = 1;
      }

      if (minute === 0) {
        time = hour + ":" + minute + "0" + " " + ampm;
      } else {
        time = hour + ":" + minute + " " + ampm;
      }

      timeSlot = {
        time: time,
        isAvailable: true,
      };

      timeSlots.push(timeSlot);
      minute += 30;
    }

    return timeSlots;
  }

  // useEffect on appointmentDate
  useEffect(() => {
    if (appointmentDate) {
      var date = new Date();
      date.setUTCDate(appointmentDate?.date());
      date.setUTCSeconds(0);
      date.setUTCMilliseconds(0);

      console.log("Converted Date: " + appointmentDate?.toDate());
      console.log(appointmentDate?.toDate().toString());
      console.log("NEWWW Date: " + date);
    }
  }, [appointmentDate]);

  async function createAppointmentCallback() {
    console.log("Create Appointment Callback");
    console.log(
      "Appointment Date: " + appointmentDate?.format("DD/MM/YYYY hh:mm A")
    );
    console.log("Patient:");
    console.log(userData);
    console.log("Doctor:");
    console.log(docinfo);

    var date = appointmentDate?.toDate();
    // var date = new Date();
    // date.setUTCDate(appointmentDate?.date() ?? 1);
    // date.setUTCHours(appointmentDate?.hour() ?? 0);
    // date.setUTCMinutes(appointmentDate?.minute() ?? 0);
    // date.setUTCSeconds(0);
    // date.setUTCMilliseconds(0);
    console.log("NEW Date: " + date);

    // create appointment
    // // Params: patientId, doctorId, date, status (enum: ["UPCOMING", "CANCELLED", "COMPLETED"])
    await dispatch(
      createAppointmentAction({
        patientId: userData._id,
        doctorId: docinfo._id,
        // date: appointmentDate?.format("DD/MM/YYYY hh:mm A"),
        date: date,
        status: "UPCOMING",
      })
    );
  }

  function otherPages() {
    switch (page) {
      case "paymentMethod":
        return (
          <PaymentMethod
            priceOriginal={docinfo?.hourlyRate * 1.1}
            priceDiscounted={docinfo?.session_price}
            appointmentDate={appointmentDate}
            backBtnOnClick={() => setPage("booking")}
            transactionDescription={
              "Patient: " +
              userData.name +
              " | Doctor: " +
              docinfo.name +
              " | Appointment Date: " +
              appointmentDate?.format("DD/MM/YYYY") +
              " | Appointment Time: " +
              appointmentDate?.format("h:mm A") +
              " | Price: " +
              docinfo?.session_price.toFixed(2) +
              " EGP"
            }
            callBackOnSuccess={createAppointmentCallback}
          />
        );
    }
  }

  function handleCheckoutClick(): void {
    // If no date is selected, show error
    if (!selectedDate) {
      // show error
      notification.error({
        message: "Error",
        description: "Please select a date",
      });
      return;
    }

    // If no time slot is selected, show error
    if (!selectedTimeSlot) {
      // show error
      notification.error({
        message: "Error",
        description: "Please select a time slot",
      });
      return;
    }

    // Create date object from selected date and time
    console.log("Selected Date: " + selectedDate.format("DD/MM/YYYY"));
    console.log("Selected Time Slot: " + selectedTimeSlot.time);
    // selectedTimeSlot is in the format: 9:00 AM
    // selectedDate is a dayjs
    var date = dayjs(
      selectedDate.format("DD/MM/YYYY") + " " + selectedTimeSlot.time,
      "DD/MM/YYYY hh:mm A"
    );
    console.log("Date: " + date);

    // Set seconds to 0
    date = date.set("second", 0).set("millisecond", 0);

    // If date is in the past, show error
    console.log("Date: " + date.format("DD/MM/YYYY hh:mm A"));
    console.log("Today: " + dayjs());
    if (date.isBefore(dayjs())) {
      console.log("Date is in the past");
      // show error
      notification.error({
        message: "Error",
        description: "Please select a future date",
      });
      return;
    }

    setAppointmentDate(date);

    setPage("paymentMethod");
  }

  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.compactAlgorithm,

        token: {
          // colorBgBase: "red",
          colorPrimary: "#163B45",
          colorBgContainer: "transparent",
        },

        components: {},
      }}
    >
      {doctorLoading ? (
        <div className={`w-full h-full flex items-center justify-center`}>
          <JellyLoader />
        </div>
      ) : (
        <div
          className={`w-full h-full flex flex-col items-start justify-start`}
        >
          <BackIcon
            fontSize={28}
            className="mb-6"
            onClick={() => {
              switch (page) {
                case "booking":
                  navigate(-1);
                  break;
                case "paymentMethod":
                  setPage("booking");
                  break;
                case "wallet":
                  setPage("paymentMethod");
                  break;
                case "card":
                  setPage("paymentMethod");
                  break;
                case "confirmation":
                  setPage("booking");
                  break;
              }
            }}
            style={{ cursor: "pointer" }}
          />
          {/* <h1>Patient Doctor Info Screen</h1> */}
          <motion.div
            className="w-full"
            initial={{ x: 0, y }} // Use x and y coordinates for initial position
            animate={{ x: 0, y: 0 }}
            exit={{ opacity: 0, x, y }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <DoctorCard doctor={docinfo} noBooking />
          </motion.div>

          {doctorLoading ? (
            <JellyLoader />
          ) : // <motion.div
          //   initial={{ opacity: 0, y: -50 }} // Use x and y coordinates for initial position
          //   animate={{ opacity: 1, y: 0 }}
          //   exit={{ opacity: 0 }}
          //   transition={{ duration: 1.2, ease: "easeIn" }}
          // >
          //   <h1>Name: {docinfo?.name}</h1>
          //   <h1>Email: {docinfo?.email}</h1>
          //   <h1>Gender: {docinfo?.gender}</h1>
          //   <h1>Speciality: {docinfo?.specialty}</h1>
          //   <h1>Affiliation: {docinfo?.affiliation}</h1>
          //   <h1>Educational Background: {docinfo?.educationalBackground}</h1>
          //   <h1>Hourly Rate: {docinfo?.hourlyRate}</h1>
          // </motion.div>

          // BOOKING PAGE
          page === "booking" ? (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeIn" }}
              className="w-full flex flex-col items-center gap-y-6 mt-10"
            >
              {/* CALENDAR AND APPOINTMENT LIST */}
              <div
                className="flex items-start justify-center gap-x-8 mt-8"
                style={{
                  transform: "scale(1.2)",
                }}
              >
                <DateCalendar
                  defaultValue={initialValue}
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  loading={isLoading}
                  onMonthChange={handleMonthChange}
                  renderLoading={() => <DayCalendarSkeleton />}
                  slots={{
                    day: ServerDay,
                  }}
                  slotProps={{
                    day: {
                      highlightedDays,
                    } as any,
                  }}
                  views={["year", "month", "day"]}
                />

                {/* Column containing all timeslots in a rounded rectangles */}
                {/* They have a dark-gren border, the selected timeslot will have a dark-green background */}
                <div
                  className={`h-[17rem] flex flex-col items-center justify-start gap-y-[0.35rem] px-4 mt-4`}
                  style={{ overflowY: "auto", overflowX: "hidden" }}
                >
                  {timeSlots.map((timeSlot: any, index: any) => (
                    <div
                      key={index}
                      className={`w-[10rem] py-[0.55rem] flex flex-row items-center justify-center rounded-xl border border-solid`}
                      style={{
                        borderColor: "var(--dark-green)",
                        backgroundColor:
                          selectedTimeSlot?.time === timeSlot.time
                            ? "var(--dark-green)"
                            : "transparent",
                      }}
                      onClick={() => setSelectedTimeSlot(timeSlot)}
                    >
                      <p
                        className={`text-sm font-normal ${
                          selectedTimeSlot?.time === timeSlot.time
                            ? "text-white"
                            : "text-dark-green"
                        }`}
                      >
                        {timeSlot.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex items-center justify-center gap-x-4">
                {/* CHECK BOX */}
                <Checkbox
                  checked={isCheckboxChecked}
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                >
                  This appointment is for a family member
                </Checkbox>

                {/* FAMILY MEMBER DROPDOWN */}
                <Select
                  // status={formik.errors.gender ? "error" : ""}
                  // onChange={formik.handleChange}
                  // value={formik.values.gender}
                  // options={GENDER_VALUES}
                  // onSelect={(value: any) => {
                  //   formik.setFieldValue("gender", value);
                  // }}
                  className={`${inputStyles.inputField} ${styles.dropdown}`}
                  style={{
                    paddingInline: "0",
                    width: "20% !important",
                  }}
                  disabled={!isCheckboxChecked}
                  placeholder="Choose member"
                  dropdownStyle={
                    // color of backgroung
                    {
                      fontFamily: "Century Gothic",
                      fontWeight: "normal",
                      // backgroundColor: "var(--dark-green)",
                      // accentColor: "var(--dark-green)",
                      // color of selected item
                      // color: "var(--white)",
                    }
                  }
                />
              </div>

              {/* CHECKOUT BTN */}
              <RoundedButton
                text="Checkout"
                icon={
                  <RightArrowIcon fontSize={18} style={{ rotate: "-45deg" }} />
                }
                onClick={() => handleCheckoutClick()}
              />
            </motion.div>
          ) : (
            otherPages()
          )}
        </div>
      )}
    </ConfigProvider>
  );
};
export default DoctorInfoScreen;
