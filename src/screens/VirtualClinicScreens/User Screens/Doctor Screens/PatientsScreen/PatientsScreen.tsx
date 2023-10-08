import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/rootReducer";
//import { listAllUsersAction } from "Redux/VirtualClinicRedux/ListAllUsers/listAllUsersAction";
import { listAllPatientsAction } from "Redux/VirtualClinicRedux/ListAllPatients/listAllPatientsAction";
import PatientInfoScreen from "./PatientInfoScreen";
import * as Routes from "Routes/VirtualClinicRoutes/paths";




const PatientsScreen = () => {
  const dispatch: any = useDispatch();

  const { patientsLoading, allPatients } = useSelector(
    (state: RootState) => state.listAllPatientsReducer
  );

  useEffect(() => {
    dispatch(listAllPatientsAction({doctor:"jawad@gmail.com"})); // sending the request, and update the states
    console.log(allPatients);
  }, []);

  const navigate = useNavigate()

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Doctor Patients Screen</h1>
      {patientsLoading ? (
        <h1>Loading...</h1>
      ) : (
        allPatients?.map((user: any) => (
          <div key={user.email} className="m-5">
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <button onClick={() => {
                navigate(Routes.DOCTORS_PATIENT_INFO_PATH, {
                state: { _id: user._id } // pass the user._id as a state object
                     });
}} >View info</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientsScreen;
