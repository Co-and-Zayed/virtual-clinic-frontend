import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { RootState } from "redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Spin,
  TimePicker,
  notification,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { patientGetDoctorsAction } from "redux/VirtualClinicRedux/PatientGetDoctors/patientGetDoctorsAction";
import { allSpecialitiesAction } from "redux/VirtualClinicRedux/Dropdowns/AllSpecialities/allSpecialitiesAction";
import { patientSearchDoctorsAction } from "redux/VirtualClinicRedux/PatientSearchDoctors/patientSearchDoctorsAction";
import { getDoctorInfoAction } from "redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import DoctorInfoScreen from "./DoctorInfoScreen";
import { patientFilterDoctorsAction } from "redux/VirtualClinicRedux/PatientFilterDoctors/patientFilterDoctorsAction";
import { createAppointmentAction } from "redux/VirtualClinicRedux/CreateAppointment/createAppoinmentAction";

const DoctorsScreen = () => {
  const { allSpecialities, specialitiesLoading } = useSelector(
    (state: RootState) => state.allSpecialitiesReducer
  );

  var { allDoctors, doctorsLoading } = useSelector(
    (state: RootState) => state.patientGetDoctorsReducer
  );
  const { userData } = useSelector((state: RootState) => state.userReducer);

  const dispatch: any = useDispatch();
  const navigate = useNavigate();

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
    <div className={`w-full flex flex-col items-start justify-center`}>
      <div className={`w-full flex justify-center items-center`}>
        <div className={`w-[80%] flex flex-col justify-center items-center`}>
          {/* SEARCH BAR */}
          {/* search for a doctor by name and/or speciality */}
          <div className={`w-full flex justify-center items-center`}>
            <div className={`w-full flex justify-center items-center`}>
              <div
                className={`w-full flex justify-center items-center bg-white rounded-xl shadow-lg my-4 py-4 px-8 gap-x-4`}
              >
                <div
                  className={`w-full flex justify-center items-center gap-x-4`}
                >
                  {/* DROPDOWN FOR SPECIALITY */}
                  <div className={`flex text-base gap-x-2 items-center`}>
                    <i className="w-[20px] fa-solid fa-stethoscope"></i>
                    <Select
                      className={`rounded-md w-52 h-10`}
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
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search for a doctor by name"
                    className={`w-96 h-10`}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  <Button
                    type="default"
                    icon={<SearchOutlined />}
                    onClick={() => {
                      dispatch(
                        patientGetDoctorsAction({
                          email: userData?.email,
                          name: searchName,
                          specialty: searchSpeciality,
                        })
                      );
                    }}
                  >
                    Search
                  </Button>

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
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-start gap-x-4">
            {/* FILTERS */}
            {/* filter  a doctor by speciality and/or availability on a certain date and at a specific time */}
            <div className={`flex flex-col justify-center items-center`}>
              <div
                className={`w-full flex justify-center items-center bg-white rounded-xl shadow-lg my-4 py-4 px-8 gap-x-4`}
              >
                <div
                  className={`w-full flex flex-col justify-center items-start gap-y-2`}
                >
                  <h1 className={`text-2xl font-bold`}>Filters</h1>
                  <div className={`flex text-base gap-x-2 items-center`}>
                    <i className="w-[20px] fa-solid fa-stethoscope"></i>
                    <Select
                      className={`rounded-md w-52 h-10`}
                      placeholder="Speciality"
                      showSearch
                      allowClear
                      onClear={() => {
                        setSpecialityFilter(null);
                      }}
                      value={specialityFilter}
                      onSelect={(value) => {
                        setSpecialityFilter(value);
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
                    />
                  </div>
                  <div className={`flex text-base gap-x-2 items-center`}>
                    <i className="w-[20px] fa-regular fa-calendar-alt"></i>
                    <DatePicker
                      className={`rounded-md w-52 h-10`}
                      format={"DD/MM/YYYY"}
                      value={dateFilter}
                      onChange={(value) => {
                        setDateFilter(value);
                      }}
                      allowClear
                    />
                  </div>
                  <div className={`flex text-base gap-x-2 items-center`}>
                    <i className="w-[20px] fa-regular fa-clock"></i>
                    <TimePicker
                      className={`rounded-md w-52 h-10`}
                      format={"hh a"}
                      onSelect={(value) => {
                        setTimeFilter(value);
                      }}
                      onChange={(value) => {
                        setTimeFilter(value);
                      }}
                      value={timeFilter}
                      allowClear
                    />
                  </div>

                  <div className="h-8"></div>

                  {/* APPLY FILTERS */}
                  <Button
                    type="default"
                    className={`w-3/4 h-10`}
                    style={{ alignSelf: "center" }}
                    onClick={() => {
                      filterDoctors();
                    }}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* DOCTORS */}
            <div className={`w-full flex flex-col justify-center items-center`}>
              {doctorsLoading ? (
                <Spin />
              ) : (
                allDoctors?.map((doctor: any) => {
                  if (doctor?.status === "PENDING") return;

                  return (
                    <div
                      className={`w-full flex flex-col justify-center items-center`}
                    >
                      <div
                        className={`w-full flex justify-center items-center bg-white rounded-xl shadow-lg my-4 py-4 px-8 gap-x-4`}
                      >
                        {/* IMAGE */}
                        <div
                          className={`w-[7rem] h-[7rem] flex justify-center items-center rounded-full aspect-square`}
                          style={{
                            // border
                            border: "1px solid #000000",
                          }}
                        >
                          {/* placeholder */}
                          <i className="fa-solid fa-user-doctor fa-2xl"></i>
                        </div>
                        {/* ATTRIBUTES */}
                        <div
                          className={`w-full flex flex-col justify-center items-start`}
                        >
                          <h1 className={`text-2xl font-bold`}>
                            <span
                              className="text-lg"
                              style={{ fontWeight: 600 }}
                            >
                              Doctor{" "}
                            </span>
                            {doctor?.name}
                          </h1>
                          <div
                            className={`flex text-base gap-x-2 items-center`}
                          >
                            <i className="fa-solid fa-stethoscope"></i>
                            {doctor?.specialty}
                          </div>
                          <div
                            className={`flex text-base gap-x-2 items-center`}
                          >
                            <i className="fa-regular fa-hospital"></i>
                            {doctor?.affiliation}
                          </div>
                          <div
                            className={`flex text-base gap-x-2 items-center`}
                          >
                            <i className="fa-solid fa-graduation-cap"></i>
                            {doctor?.educationalBackground}
                          </div>
                          {/* If hourlyRate * 1.1 is less than session price, then display the houlryRate * 1.1 with strikethrough and the session_price next to it */}
                          {/* Else, display the session price */}
                          <div
                            className={`flex text-base gap-x-2 items-center`}
                          >
                            <i className="fa-solid fa-money-bill-wave"></i>
                            <p>Session Price :</p>
                            {doctor?.hourlyRate * 1.1 >
                            doctor?.session_price ? (
                              <>
                                <span className={`line-through`}>
                                  EGP{" "}
                                  {(doctor?.hourlyRate * 1.1)?.toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </span>{" "}
                                EGP{" "}
                                {doctor?.session_price?.toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                              </>
                            ) : (
                              /*  button */
                              <>
                                <span>
                                  EGP{" "}
                                  {doctor?.session_price?.toLocaleString(
                                    undefined,
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                </span>
                              </>
                            )}
                            <a
                              onClick={() => {
                                getDoctorName(doctor?.username);
                              }}
                              className={`text-blue-500 hover:text-blue-700 cursor-pointer`}
                            >
                              View
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsScreen;
