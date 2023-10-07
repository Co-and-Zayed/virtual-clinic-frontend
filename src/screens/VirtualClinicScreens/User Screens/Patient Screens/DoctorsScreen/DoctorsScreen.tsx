import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const DoctorsScreen = () => {
  // a doctor is:
  //  name: {
  //     type: String,
  //     required : true
  // },
  // email: {
  //     type: String,
  //     required : true
  // },
  // username:  {
  //     type: String,
  //     required : true
  // },
  // password:  {
  //     type: String,
  //     required : true
  // },
  // specialty:  {
  //     type: String,
  //     required : true
  // },
  // date_of_birth:  {
  //     type: Date,
  //     required : true
  // },
  // affiliation:  {
  //     type: String,
  //     required : true
  // },
  // educationalBackground:  {
  //     type: String,
  //     required : true
  // },
  // hourlyRate:  {
  //     type: Number,
  //     required : true
  // },
  // generate a random doctor
  const doctors = [
    {
      name: "Shady Hani",
      email: "doc.shady@gmail.com",
      specialty: "Dentist",
      date_of_birth: new Date("1999-01-01"),
      affiliation: "German University in Cairo",
      educationalBackground: "Phd",
      hourlyRate: 350,
      session_price: 500.0,
    },
    {
      name: "Seif Hany",
      email: "doc.seif@gmail.com",
      specialty: "Physician",
      date_of_birth: new Date("1999-01-01"),
      affiliation: "German University in Cairo",
      educationalBackground: "Phdzz",
      hourlyRate: 500,
      session_price: 450.0,
    },
    {
      name: "Deema Magdy",
      email: "doc.deema@gmail.com",
      specialty: "Researcher",
      date_of_birth: new Date("1999-01-01"),
      affiliation: "German University in Cairo",
      educationalBackground: "Phd",
      hourlyRate: 400,
      session_price: 350.0,
    },
  ];

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
                    <select
                      className={`border border-gray-300 rounded-md w-52 h-10 px-2`}
                    >
                      <option value="Dentist">Dentist</option>
                      <option value="Physician">Physician</option>
                      <option value="Researcher">Researcher</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Search for a doctor by name"
                    className={`border border-gray-300 rounded-md w-96 h-10 px-2`}
                  />
                  <button
                    className={`bg-[#1E3A8A] text-white rounded-md w-24 h-10 px-2`}
                  >
                    Search
                  </button>
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
              {doctors.map((doctor) => (
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
                        {doctor.name}
                      </h1>
                      <div className={`flex text-base gap-x-2 items-center`}>
                        <i className="fa-solid fa-stethoscope"></i>
                        {doctor.specialty}
                      </div>
                      <div className={`flex text-base gap-x-2 items-center`}>
                        <i className="fa-regular fa-hospital"></i>
                        {doctor.affiliation}
                      </div>
                      <div className={`flex text-base gap-x-2 items-center`}>
                      <i className="fa-solid fa-graduation-cap"></i>
                        {doctor.educationalBackground}
                      </div>
                      {/* If hourlyRate * 1.1 is less than session price, then display the houlryRate * 1.1 with strikethrough and the session_price next to it */}
                      {/* Else, display the session price */}
                      <div className={`flex text-base gap-x-2 items-center`}>
                        <i className="fa-solid fa-money-bill-wave"></i>
                        <p>Session Price :</p>
                        {doctor.hourlyRate * 1.1 > doctor.session_price ? (
                          <>
                            <span className={`line-through`}>
                              EGP {(doctor.hourlyRate * 1.1).toFixed(2)}
                            </span>{" "}
                            EGP {doctor.session_price.toFixed(2)}
                          </>
                        ) : (
                          <span>EGP {doctor.session_price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsScreen;
