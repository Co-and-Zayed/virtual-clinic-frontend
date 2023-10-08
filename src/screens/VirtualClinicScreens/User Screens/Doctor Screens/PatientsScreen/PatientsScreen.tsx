import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/rootReducer";
//import { listAllUsersAction } from "Redux/VirtualClinicRedux/ListAllUsers/listAllUsersAction";
import { listAllPatientsAction } from "Redux/VirtualClinicRedux/ListAllPatients/listAllPatientsAction";
import { listPatientByNameAction } from "Redux/VirtualClinicRedux/ListPatientByName/listPatientByNameAction";
import { listPatientInfoAction } from "Redux/VirtualClinicRedux/ListPatientInfo/listPatientInfoAction";
import PatientInfoScreen from "./PatientInfoScreen";
import * as Routes from "Routes/VirtualClinicRoutes/paths";
import { getValue } from "@testing-library/user-event/dist/utils";


const PatientsScreen = () => {
  const dispatch: any = useDispatch();

  const { searchPatient, patient } = useSelector(
    (state: RootState) => state.listPatientByNameReducer
  );

  const { patientsLoading, allPatients } = useSelector(
    (state: RootState) => state.listAllPatientsReducer
  );

  const { patientInfoLoading, patientInfo } = useSelector(
    (state: RootState) => state.listPatientInfoReducer
  );

  const [searchName, setSearchName] = useState(''); // State to store the search input
  const [viewedUserId, setViewedUserId] = useState(null); 

  useEffect(() => {
    dispatch(listAllPatientsAction({doctor:"jawad@gmail.com"})); // sending the request, and update the states
    console.log(allPatients);
  }, []);

  const navigate = useNavigate()

  const handleSearch = () => {
    // Dispatch an action to send a request to the backend API
    dispatch(listPatientByNameAction({ name: searchName}));
  };

  const handleViewInfo = async (userID:any) => {
    // Dispatch an action to send a request to the backend API
    setViewedUserId(userID); // Set the user being viewed
    dispatch(listPatientInfoAction({ _id : userID}));
  };

   const handleRemove = () => {
    // Clear the search results
    const initialState = {
      patientInfo: null,
      pateint:null
    };    // Clear the patient info
  };


  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Doctor Patients Screen</h1>
      {/* Search input */}
    <input
      type="text"
      placeholder="Enter patient name"
      value={searchName}
      onChange={(e) => setSearchName(e.target.value)}
    />
    {/* Search button */}
    <button onClick={handleSearch}>Search</button>

    {searchPatient ? (
        <h1>Loading...</h1>
      ) : (
        patient?.map((detail: any) => (
          <div key={detail._id} className="m-5">
            <h1>{detail.name}</h1>
            <h1>{detail.email}</h1>
            <h1>{detail.healthRecords}</h1>
            <h1>{detail.date_of_birth}</h1>
            <button onClick={handleRemove}>Remove</button>
          </div>
          
        ))
      )}


      {patientsLoading ? (
        <h1>Loading...</h1>
      ) : (
        allPatients?.map((user: any) => (
          <div key={user.email} className="m-5">
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <button value ={user._id} onClick={() => handleViewInfo(user._id)}>View Info</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientsScreen;
