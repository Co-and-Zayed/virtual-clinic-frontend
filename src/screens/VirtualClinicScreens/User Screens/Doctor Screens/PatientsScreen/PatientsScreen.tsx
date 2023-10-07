import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { listAllUsersAction } from "redux/VirtualClinicRedux/ListAllUsers/listAllUsersAction";

const PatientsScreen = () => {
  const dispatch: any = useDispatch();

  const { usersLoading, allUsers } = useSelector(
    (state: RootState) => state.listAllUsersReducer
  );

  useEffect(() => {
    dispatch(listAllUsersAction()); // sending the request, and update the states
    console.log(allUsers);
  }, []);

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Doctor Patients Screen</h1>
      {usersLoading ? (
        <h1>Loading...</h1>
      ) : (
        allUsers?.map((user: any) => (
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
