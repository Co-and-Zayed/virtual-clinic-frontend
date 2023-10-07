import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { listAllUsersAction } from "redux/VirtualClinicRedux/ListAllUsers/listAllUsersAction";
import { getDoctorInfoAction } from "redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
const PatientsScreen = () => {
  const dispatch: any = useDispatch();
  const { doctorLoading, docinfo } = useSelector(
      (state: RootState) => state.getDoctorInfoReducer
     );


  useEffect(() => {
    dispatch(getDoctorInfoAction({
     id:"777"
     
    })); // sending the request, and update the states
    console.log(docinfo);
   }, []);

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Doctor Patients Screen</h1>
      {doctorLoading ? (
        <h1>Loading...</h1>
      ) : (
        docinfo?.map((user: any) => (
          <div key={user._id} className="m-5">
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientsScreen;
