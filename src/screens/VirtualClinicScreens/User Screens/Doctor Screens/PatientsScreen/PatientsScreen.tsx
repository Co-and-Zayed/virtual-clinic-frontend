import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { listAllPatientsAction } from "redux/VirtualClinicRedux/ListAllPatients/listAllPatientsAction";
import { listPatientByNameAction } from "redux/VirtualClinicRedux/ListPatientByName/listPatientByNameAction";
import { listPatientInfoAction } from "redux/VirtualClinicRedux/ListPatientInfo/listPatientInfoAction";
import PatientInfoScreen from "./PatientInfoScreen";
import * as Routes from "Routes/VirtualClinicRoutes/paths";

const PatientsScreen = () => {
  const dispatch: any = useDispatch();

  const { doctorLoading, docinfo } = useSelector(
    (state: RootState) => state.getDoctorInfoReducer
  );
  const { searchPatient, patient } = useSelector(
    (state: RootState) => state.listPatientByNameReducer
  );

  const { patientsLoading, allPatients } = useSelector(
    (state: RootState) => state.listAllPatientsReducer
  );

  const { patientInfoLoading, patientInfo } = useSelector(
    (state: RootState) => state.listPatientInfoReducer
  );

  const [searchName, setSearchName] = useState(""); // State to store the search input
  const [viewedUserId, setViewedUserId] = useState(null);

  useEffect(() => {
    dispatch(listAllPatientsAction({ doctor: "jawad@gmail.com" })); // sending the request, and update the states
    console.log(allPatients);
  }, []);

  const navigate = useNavigate();

  const handleSearch = () => {
    // Dispatch an action to send a request to the backend API
    dispatch(listPatientByNameAction({ name: searchName }));
  };

  const handleViewInfo = async (userID: any) => {
    // Dispatch an action to send a request to the backend API
    setViewedUserId(userID); // Set the user being viewed
    dispatch(listPatientInfoAction({ _id: userID }));
  };

  const handleRemove = () => {
    // Clear the search results
    const initialState = {
      patientInfo: null,
      pateint: null,
    }; // Clear the patient info
  };

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Doctor Patients Screen</h1>
    </div>
  );
};

export default PatientsScreen;
