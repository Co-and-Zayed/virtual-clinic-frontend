import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { listPatientInfoAction } from "VirtualClinic/redux/VirtualClinicRedux/ListPatientInfo/listPatientInfoAction";
import { useLocation } from "react-router-dom";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";

const PatientInfoScreen = () => {
  const dispatch: any = useDispatch();

  const location = useLocation();
  const _id = location.state._id;

  const { patientInfoLoading, patientInfo } = useSelector(
    (state: RootState) => state.listPatientInfoReducer
  );

  useEffect(() => {
    dispatch(listPatientInfoAction()); // sending the request, and update the states
  }, []);

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Doctor Patient Info Screen</h1>
      {patientInfoLoading ? (
        <JellyLoader />
      ) : (
        patientInfo?.map((user: any) => (
          <div key={user._id} className="m-5">
            <h1>Name: {user.name}</h1>
            <h1>Email: {user.email}</h1>
            <h1>Gender: {user.gender}</h1>
            <h1>dob: {user.date_of_birth}</h1>
            <h1>HealthRecords: {user.healthRecords}</h1>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientInfoScreen;
