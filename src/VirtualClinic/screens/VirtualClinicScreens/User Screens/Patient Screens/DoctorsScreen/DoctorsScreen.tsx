import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen.module.css";
import inputStyles from "VirtualClinic/components/InputField/InputField.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Input,
  Select,
  TimePicker,
  notification,
  theme,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { patientGetDoctorsAction } from "VirtualClinic/redux/VirtualClinicRedux/PatientGetDoctors/patientGetDoctorsAction";
import { allSpecialitiesAction } from "VirtualClinic/redux/VirtualClinicRedux/Dropdowns/AllSpecialities/allSpecialitiesAction";
import { patientSearchDoctorsAction } from "VirtualClinic/redux/VirtualClinicRedux/PatientSearchDoctors/patientSearchDoctorsAction";
import { getDoctorInfoAction } from "VirtualClinic/redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import DoctorInfoScreen from "./DoctorInfoScreen";
import { patientFilterDoctorsAction } from "VirtualClinic/redux/VirtualClinicRedux/PatientFilterDoctors/patientFilterDoctorsAction";
import { createAppointmentAction } from "VirtualClinic/redux/VirtualClinicRedux/CreateAppointment/createAppoinmentAction";
import SearchButton from "VirtualClinic/components/SearchButton/SearchButton";
import InputField from "VirtualClinic/components/InputField/InputField";

// import Icon from "VirtualClinic/assets/images/add-circle";
import DoctorCard from "VirtualClinic/components/DoctorCard/DoctorCard";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import { AnimatePresence, motion } from "framer-motion";

const DoctorsScreen = () => {
  const { allSpecialities, specialitiesLoading } = useSelector(
    (state: RootState) => state.allSpecialitiesReducer
  );

  var { allDoctors, doctorsLoading } = useSelector(
    (state: RootState) => state.patientGetDoctorsReducer
  );
  const { userData } = useSelector((state: RootState) => state.userReducer);

  const dispatch: any = useDispatch();
  const navigate = useNav();

  const [specialityFilter, setSpecialityFilter] = useState<any>(null);
  const [dateFilter, setDateFilter] = useState<any>(null);
  const [timeFilter, setTimeFilter] = useState<any>(null);
  // const [specialitiesFilter, setSpecialitiesFilter] = useState<any>([]);

  const [searchSpeciality, setSearchSpeciality] = useState(null);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log("USER DATA", userData);
    dispatch(allSpecialitiesAction());
    dispatch(patientGetDoctorsAction());
  }, []);

  // useEffect(() => {
  //   // Get all unique specialities from all doctors
  //   let uniqueSpecialities: any = [];
  //   allDoctors?.map((doctor: any) => {
  //     if (!uniqueSpecialities.includes(doctor?.specialty)) {
  //       uniqueSpecialities.push(doctor?.specialty);
  //     }
  //   });
  //   setSpecialitiesFilter(uniqueSpecialities);
  //   console.log("UNIQUE SPECIALITIES", uniqueSpecialities);
  //   console.log("SPECIALITIES FILTER", specialitiesFilter);
  // }, [allDoctors]);

  const getDoctorName = async (doctorUsername: any) => {
    await dispatch(getDoctorInfoAction({ username: doctorUsername }));
    navigate("/doctor-info");
  };

  // Filter allDoctors
  function filterDoctors() {
    // Check if all filters are null
    if (!specialityFilter && !dateFilter && !timeFilter) {
      return;
    }

    console.log("SPECIALITY FILTER", specialityFilter);
    console.log("DATE FILTER", dateFilter);
    console.log("TIME FILTER", timeFilter);

    // Date and time filters must be selected together
    if ((dateFilter && !timeFilter) || (!dateFilter && timeFilter)) {
      notification.warning({
        message: "Please select both date and time filters",
      });
      return;
    }

    dispatch(
      patientFilterDoctorsAction({
        specialty: specialityFilter,
        date: dateFilter,
        time: timeFilter,
      })
    );
  }

  function createAppointment() {
    if (!dateFilter || !timeFilter) {
      notification.warning({
        message:
          "Please select both date and time filters to create appointment",
      });
      return;
    }

    // combine date and time
    const date = new Date(dateFilter);
    const time = new Date(timeFilter);
    date.setHours(time.getHours());
    date.setMinutes(0);
    date.setSeconds(0);

    dispatch(
      createAppointmentAction({
        doctorEmail: "jawad@gmail.com",
        patientEmail: userData?.email,
        date: date,
        status: "UPCOMING",
      })
    );
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
      <motion.div
        initial={{ opacity: 0 }} // Use x and y coordinates for initial position
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className={`w-full h-full flex flex-col items-start justify-center`}
      >
        {/* TITLE */}
        <h1
          className={`pageHeading font-bold mb-12`}
          style={{ color: "var(--dark-green)" }}
        >
          Doctors
        </h1>
        <div className={`w-full flex justify-center items-center`}>
          {/* TOP BAR */}
          <div className={`w-full flex justify-between items-center`}>
            {/* SEARCH SECTION */}
            <div className={`${styles.topRowRow}`}>
              <div className="flex gap-x-2 items-center">
                <Input
                  type="text"
                  placeholder="Search by doctor name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className={`${inputStyles.inputField}`}
                  style={{ width: "15rem" }}
                />
                <SearchButton
                  onClick={() => {
                    dispatch(
                      patientGetDoctorsAction({
                        email: userData?.email,
                        name: searchName,
                        specialty: searchSpeciality,
                      })
                    );
                  }}
                />
              </div>

              {/* DROPDOWN FOR SPECIALITY */}
              <div className={`flex text-base gap-x-2 items-center`}>
                {/* <i className="w-[20px] fa-solid fa-stethoscope"></i> */}
                <Select
                  placeholder="Select a speciality"
                  showSearch
                  allowClear
                  onClear={() => {
                    setSearchSpeciality(null);
                  }}
                  value={searchSpeciality}
                  onSelect={(value) => {
                    setSearchSpeciality(value);
                  }}
                  optionFilterProp="children"
                  options={allSpecialities?.map((speciality: any) => ({
                    value: speciality,
                    label: speciality,
                  }))}
                  filterOption={(input, option: any) =>
                    option?.children
                      ?.toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  className={`${inputStyles.lightInputField}`}
                  style={{
                    paddingInline: "0",
                    width: "12rem",
                  }}
                  dropdownStyle={{
                    fontFamily: "Century Gothic",
                    fontWeight: "normal",
                  }}
                />
              </div>
            </div>

            {/* SEARCH */}

            {/* FOR TESTING */}
            {/* <Button
                      type="default"
                      icon={<SearchOutlined />}
                      onClick={() => {
                        createAppointment();
                      }}
                    >
                      Create Appointment
                    </Button> */}

            {/* FILTERS */}
            <div className={`${styles.topRowRow}`}>
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
                format={"hh a"}
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
                noSearchIcon
                text="Apply"
                onClick={() => {
                  filterDoctors();
                }}
              />
            </div>
          </div>
        </div>
        {/* DOCTORS */}
        <div
          className={`w-full flex flex-col items-center ${styles.doctorsList} mt-4`}
        >
          {doctorsLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <JellyLoader />
            </div>
          ) : (
            allDoctors?.map((doctor: any, idx: number) => {
              if (doctor?.status !== "ACCEPTED") return;

              return (
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    // ease: "easeIn",
                    ease: [0.38, 0.01, 0.39, 1.1],
                    delay: idx * 0.1,
                  }}
                >
                  <DoctorCard doctor={doctor} />
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    </ConfigProvider>
  );
};

export default DoctorsScreen;
