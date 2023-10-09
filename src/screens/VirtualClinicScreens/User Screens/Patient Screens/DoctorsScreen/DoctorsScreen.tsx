import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { RootState } from "redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Select, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { patientGetDoctorsAction } from "redux/VirtualClinicRedux/PatientGetDoctors/patientGetDoctorsAction";
import { allSpecialitiesAction } from "redux/VirtualClinicRedux/Dropdowns/AllSpecialities/allSpecialitiesAction";
import { patientSearchDoctorsAction } from "redux/VirtualClinicRedux/PatientSearchDoctors/patientSearchDoctorsAction";
import { getDoctorInfoAction } from "redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import DoctorInfoScreen from "./DoctorInfoScreen";

const DoctorsScreen = () => {
  const { allSpecialities, specialitiesLoading } = useSelector(
    (state: RootState) => state.allSpecialitiesReducer
  );

  const { allDoctors, doctorsLoading } = useSelector(
    (state: RootState) => state.patientGetDoctorsReducer
  );
  const { userData } = useSelector((state: RootState) => state.userReducer);

  const dispatch: any = useDispatch();

  const [searchSpeciality, setSearchSpeciality] = useState(null);
  const [searchName, setSearchName] = useState("");


 
  useEffect(() => {
    console.log("USER DATA", userData);
    dispatch(allSpecialitiesAction());
    dispatch(
      patientGetDoctorsAction({
        email: userData?.email,
      })
    );
  }, []);

  useEffect(() => {
    console.log(allDoctors);
  }, [allDoctors]);


const getDoctorName = () => {
  
  dispatch(getDoctorInfoAction({ name: searchName }));
};

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
                          email: "shady.hani1@gmail.com",
                          name: searchName,
                          specialty: searchSpeciality,
                        })
                      );
                    }}
                  >
                    Search
                  </Button>
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
                    <select
                      className={`border border-gray-300 rounded-md w-52 h-10 px-2`}
                    >
                      <option value="Dentist">Dentist</option>
                      <option value="Physician">Physician</option>
                      <option value="Researcher">Researcher</option>
                    </select>
                  </div>
                  <div className={`flex text-base gap-x-2 items-center`}>
                    <i className="w-[20px] fa-regular fa-calendar-alt"></i>
                    <input
                      type="date"
                      className={`border border-gray-300 rounded-md w-52 h-10 px-2`}
                    />
                  </div>
                  <div className={`flex text-base gap-x-2 items-center`}>
                    <i className="w-[20px] fa-regular fa-clock"></i>
                    <input
                      type="time"
                      className={`border border-gray-300 rounded-md w-52 h-10 px-2`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DOCTORS */}
            <div className={`w-full flex flex-col justify-center items-center`}>
              {doctorsLoading ? (
                <Spin />
              ) : (
                allDoctors?.map((doctor: any) => (
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
                          <span className="text-lg" style={{ fontWeight: 600 }}>
                            Doctor{" "}
                          </span>
                          {doctor?.name}
                        </h1>
                        <div className={`flex text-base gap-x-2 items-center`}>
                          <i className="fa-solid fa-stethoscope"></i>
                          {doctor?.specialty}
                        </div>
                        <div className={`flex text-base gap-x-2 items-center`}>
                          <i className="fa-regular fa-hospital"></i>
                          {doctor?.affiliation}
                        </div>
                        <div className={`flex text-base gap-x-2 items-center`}>
                          <i className="fa-solid fa-graduation-cap"></i>
                          {doctor?.educationalBackground}
                        </div>
                        {/* If hourlyRate * 1.1 is less than session price, then display the houlryRate * 1.1 with strikethrough and the session_price next to it */}
                        {/* Else, display the session price */}
                        <div className={`flex text-base gap-x-2 items-center`}>
                          <i className="fa-solid fa-money-bill-wave"></i>
                          <p>Session Price :</p>
                          {doctor?.hourlyRate * 1.1 > doctor?.session_price ? (
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
                              <button onClick={getDoctorName}>View</button>
                            </>
                          ) : 
                          /*  button */
                        /*<button onClick={getDoctorName}>View</button>*/
                          
                          (
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
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default DoctorsScreen;
