import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { RootState } from "redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Select, Spin } from "antd";
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

  var { doctorLoading, docinfo } = useSelector(
    (state: RootState) => state.getDoctorInfoReducer
  );

  const { x, y } = useSelector(
    (state: RootState) => state.getDoctorCardCoordsReducer
  );

  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const [timeSlots, setTimeSlots] = useState<any>(generateTimeSlots());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  useEffect(() => {
    console.log(docinfo + "DoctorInfo");
    document.title = "El7a2ni" + (docinfo && " | " + docinfo.name);
    // set doctorLoading to true for 2 seconds
    doctorLoading = true;
    setTimeout(() => {
      doctorLoading = false;
    }, 2000);
  }, []);

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

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Patient Doctor Info Screen</h1>
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
      ) : (
        // <motion.div
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

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeIn" }}
          className="w-full flex items-center justify-center gap-x-8 mt-10"
        >
          <DateCalendar
            defaultValue={initialValue}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
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
            // className="m-0"
          />

          {/* Column containing all timeslots in a rounded rectangles */}
          {/* They have a dark-gren border, the selected timeslot will have a dark-green background */}
          <div
            className={`h-[17rem] flex flex-col items-center justify-start gap-y-[0.35rem] px-4`}
            style={{overflowY: "auto"}}
          >
            {timeSlots.map((timeSlot: any, index: any) => (
              <div
                key={index}
                className={`w-[10rem] py-2 flex flex-row items-center justify-center rounded-xl border-2 border-solid`}
                style={{
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
        </motion.div>
      )}
    </div>
  );
};
export default DoctorInfoScreen;
