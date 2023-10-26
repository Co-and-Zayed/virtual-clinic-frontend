import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/DoctorsScreen.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { RootState } from "redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Select, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import { patientGetDoctorsAction } from "redux/VirtualClinicRedux/PatientGetDoctors/patientGetDoctorsAction";
// import { allSpecialitiesAction } from "redux/VirtualClinicRedux/Dropdowns/AllSpecialities/allSpecialitiesAction";
// import { patientSearchDoctorsAction } from "redux/VirtualClinicRedux/PatientSearchDoctors/patientSearchDoctorsAction";
import { getDoctorInfoAction } from "redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import JellyLoader from "components/JellyLoader/JellyLoader";

const DoctorInfoScreen = () => {
  //const { name } = useParams<{ name: string }>();   //name of dr
  const dispatch: any = useDispatch();

  const { doctorLoading, docinfo } = useSelector(
    (state: RootState) => state.getDoctorInfoReducer
  );

  useEffect(() => {
    console.log(docinfo + "DoctorInfo");
  }, []);

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Patient Doctor Info Screen</h1>
      {doctorLoading ? (
        <JellyLoader />
      ) : (
        docinfo?.map((user: any) => (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>Email: {user.email}</h1>
            <h1>Gender: {user.gender}</h1>
            <h1>Speciality: {user.specialty}</h1>
            <h1>Affiliation: {user.affiliation}</h1>
            <h1>Educational Background: {user.educationalBackground}</h1>
            <h1>Hourly Rate: {user.hourlyRate}</h1>
          </div>
        ))
      )}
    </div>
  );
};
export default DoctorInfoScreen;
