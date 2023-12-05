import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen.module.css";
import inputStyles from "VirtualClinic/components/InputField/InputField.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { RootState } from "VirtualClinic/redux/rootReducer";
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
import { getDoctorInfoAction } from "VirtualClinic/redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import { getFamilyMembersAction } from "VirtualClinic/redux/VirtualClinicRedux/GetFamilyMembers/getFamilyMembersAction";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import DoctorCard from "VirtualClinic/components/DoctorCard/DoctorCard";
import { motion } from "framer-motion";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import Badge from "@mui/material/Badge";
import { BackIcon, RightArrowIcon } from "VirtualClinic/assets/IconComponents";
import InputField from "VirtualClinic/components/InputField/InputField";
import PaymentMethod from "./PaymentScreens/PaymentMethod";
import PayWithCard from "./PaymentScreens/PayWithCard";
import ConfirmationScreen from "./PaymentScreens/ConfirmationScreen";
import RoundedButton from "VirtualClinic/components/RoundedButton/RoundedButton";
import PayWithWallet from "./PaymentScreens/PayWithWallet";
import { createAppointmentAction } from "VirtualClinic/redux/VirtualClinicRedux/CreateAppointment/createAppoinmentAction";
import CoolCalendar from "VirtualClinic/components/CoolCalendar/CoolCalendar";
import { useNav } from "VirtualClinic/hooks/useNav";

const DoctorInfoScreen = () => {
  //const { name } = useParams<{ name: string }>();   //name of dr
  const dispatch: any = useDispatch();

  const { userData } = useSelector((state: RootState) => state.userReducer);

  var { doctorLoading, docinfo } = useSelector(
    (state: RootState) => state.getDoctorInfoReducer
  );

  const { userFamilyMembers, familyMembersLoading } = useSelector(
    (state: RootState) => state.getFamilyMembersReducer
  );

  const { x, y } = useSelector(
    (state: RootState) => state.getDoctorCardCoordsReducer
  );

  const navigate = useNav();

  // booking, paymentMethod, wallet, card, confirmation
  const [page, setPage] = useState("booking");

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const [timeSlots, setTimeSlots] = useState<any>(generateTimeSlots());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);

  const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const [selectedFamilyMember, setSelectedFamilyMember] = useState<any>(null);
  const [selectedFamilyMemberObj, setSelectedFamilyMemberObj] =
    useState<any>(null);

  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    document.title = "El7a2ni" + (docinfo && " | " + docinfo.name);

    dispatch(getDoctorInfoAction({ username: username }));
    dispatch(getFamilyMembersAction({ userId: userData._id }, true));
  }, []);

  useEffect(() => {
    if (docinfo) {
      
      
    }
  }, [docinfo]);

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
    }
  }, [appointmentDate]);

  async function createAppointmentCallback() {
    var date = appointmentDate?.toDate();

    // create appointment
    // // Params: patientId, doctorId, date, status (enum: ["UPCOMING", "CANCELLED", "COMPLETED"])
    
      "Appointment for: " + isCheckboxChecked &&
        selectedFamilyMemberObj?.familyMember?.type === "GUEST"
        ? "GUEST"
        : "PATIENT"
    // );
    await dispatch(
      createAppointmentAction({
        patientId: isCheckboxChecked ? selectedFamilyMember : userData._id,
        doctorId: docinfo._id,
        date: date,
        status: "UPCOMING",
        patientType:
          isCheckboxChecked &&
          selectedFamilyMemberObj?.familyMember?.type === "GUEST"
            ? "GUEST"
            : "PATIENT",
      })
    );
  }

  function otherPages() {
    switch (page) {
      case "paymentMethod":
        return (
          <PaymentMethod
            priceOriginal={docinfo?.hourlyRate * 1.1}
            priceDiscounted={
              getDiscountedPriceForFamilyMember() ?? docinfo?.session_price
            }
            appointmentDate={appointmentDate}
            backBtnOnClick={() => setPage("booking")}
            transactionDescription={
              "Patient: " +
                (isCheckboxChecked
                  ? selectedFamilyMemberObj?.familyMember?.name
                  : userData.name) +
                " | Doctor: " +
                docinfo.name +
                " | Appointment Date: " +
                appointmentDate?.format("DD/MM/YYYY") +
                " | Appointment Time: " +
                appointmentDate?.format("h:mm A") +
                " | Price: " +
                getDiscountedPriceForFamilyMember()?.toFixed(2) ??
              docinfo?.session_price.toFixed(2) + " EGP"
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
    
    
    // selectedTimeSlot is in the format: 9:00 AM
    // selectedDate is a dayjs
    var date = dayjs(
      selectedDate.format("DD/MM/YYYY") + " " + selectedTimeSlot.time,
      "DD/MM/YYYY hh:mm A"
    );
    

    // Set seconds to 0
    date = date.set("second", 0).set("millisecond", 0);

    // If date is in the past, show error
    
    
    if (date.isBefore(dayjs())) {
      
      // show error
      notification.error({
        message: "Error",
        description: "Please select a future date",
      });
      return;
    }

    // Check if checkbox is checked but no family member is selected
    if (isCheckboxChecked && !selectedFamilyMember) {
      // show error
      notification.error({
        message: "Error",
        description: "Please select a family member",
      });
      return;
    }

    setAppointmentDate(date);

    setPage("paymentMethod");
  }

  function getDiscountedPriceForFamilyMember() {
    return isCheckboxChecked &&
      selectedFamilyMemberObj &&
      selectedFamilyMemberObj?.familyMember?.doctor_session_discount
      ? docinfo?.hourlyRate *
          1.1 *
          (1 - selectedFamilyMemberObj?.familyMember?.doctor_session_discount)
      : null;
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
            <DoctorCard
              doctor={docinfo}
              noBooking
              discountedPrice={getDiscountedPriceForFamilyMember()}
            />
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
                <CoolCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  daysToHighlight={[]}
                />

                {/* Column containing all timeslots in a rounded rectangles */}
                {/* They have a dark-gren border, the selected timeslot will have a dark-green background */}
                <div
                  className={`h-[17rem] flex flex-col items-center justify-start gap-y-[0.35rem] px-4 mt-4`}
                  style={{ overflowY: "auto", overflowX: "hidden" }}
                >
                  {timeSlots.map((timeSlot: any, index: any) => {
                    // Check if doctor has an appointment at this time

                    var hasAppointment = false;
                    if (docinfo?.appointments) {
                      docinfo.appointments.forEach((appointment: any) => {
                        var appointmentDate = dayjs(appointment.date);
                        var appointmentTime = appointmentDate.format("h:mm A");

                        if (
                          selectedDate?.format("DD/MM/YYYY") ===
                            appointmentDate.format("DD/MM/YYYY") &&
                          appointmentTime === timeSlot.time
                        ) {
                          hasAppointment = true;
                          
                          
                        }
                      });
                    }

                    return (
                      <Button
                        disabled={hasAppointment}
                        key={index}
                        className={`w-[10rem] h-[2.5rem] py-[1rem] flex flex-row items-center justify-center rounded-xl border border-solid`}
                        style={{
                          borderColor: hasAppointment
                            ? ""
                            : "var(--dark-green)",
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
                          style={{
                            // strike through if not available
                            textDecoration: hasAppointment
                              ? "line-through"
                              : "",
                            fontFamily: "Cabin",
                          }}
                        >
                          {timeSlot.time}
                        </p>
                      </Button>
                    );
                  })}
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
                  value={selectedFamilyMember}
                  options={userFamilyMembers?.map((member: any) => {
                    return {
                      label:
                        member.familyMember?.name +
                        "  (" +
                        (member.type === "EXISTING"
                          ? member.relation
                          : member.familyMember.relation) +
                        ")",
                      value: member.familyMember._id,
                    };
                  })}
                  allowClear
                  onChange={(value) => {
                    setSelectedFamilyMember(value);
                    setSelectedFamilyMemberObj(
                      userFamilyMembers?.find(
                        (member: any) => member.familyMember._id === value
                      )
                    );
                  }}
                  className={`${inputStyles.inputField} ${styles.dropdown}`}
                  style={{
                    paddingInline: "0",
                    width: "20% !important",
                  }}
                  disabled={!isCheckboxChecked}
                  placeholder="Choose member"
                  dropdownStyle={{
                    fontFamily: "Century Gothic",
                    fontWeight: "normal",
                  }}
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
