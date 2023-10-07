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
      name: "Dr. Shady Hani",
      email: "doc.shady@gmail.com",
      specialty: "Dentist",
      date_of_birth: new Date("1999-01-01"),
      affiliation: "German University in Cairo",
      educationalBackground: "Phd",
      hourlyRate: 350,
    },
    {
      name: "Dr. Seif Hani",
      email: "doc.seif@gmail.com",
      specialty: "Physician",
      date_of_birth: new Date("1999-01-01"),
      affiliation: "German University in Cairo",
      educationalBackground: "Phdzz",
      hourlyRate: 500,
    },
    {
      name: "Dr. Deema Magdy",
      email: "doc.deema@gmail.com",
      specialty: "Researcher",
      date_of_birth: new Date("1999-01-01"),
      affiliation: "German University in Cairo",
      educationalBackground: "Phd",
      hourlyRate: 400,
    },
  ];

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      {/* Map the doctors */}
      {/* Each should have a card displaying all their info */}

      <div className={`w-full flex justify-center items-center`}>
        <div className={`w-full flex flex-col justify-center items-center`}>
          <h1 className={`text-3xl font-bold`}>Doctors</h1>
          <div className={`w-full flex flex-col justify-center items-center`}>
            {doctors.map((doctor) => (
              <div
                className={`w-full flex flex-col justify-center items-center`}
              >
                <div
                  className={`w-full flex justify-center items-center bg-white rounded-xl shadow-lg my-4 py-4 px-8`}
                >
                  <div
                    className={`w-full flex flex-col justify-center items-start`}
                  >
                    <h1 className={`text-2xl font-bold`}>{doctor.name}</h1>
                    <h1 className={`text-lg font-bold`}>{doctor.specialty}</h1>
                    <h1 className={`text-lg font-bold`}>
                      {doctor.affiliation}
                    </h1>
                    <h1 className={`text-lg font-bold`}>
                      {doctor.educationalBackground}
                    </h1>
                    <h1 className={`text-lg font-bold`}>{doctor.hourlyRate}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsScreen;
