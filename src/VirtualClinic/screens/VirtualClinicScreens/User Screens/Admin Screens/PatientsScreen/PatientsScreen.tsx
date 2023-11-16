import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Admin Screens/PatientsScreen/PatientsScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { Input, notification, Spin, Table } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { adminListAllPatientsAction } from "VirtualClinic/redux/VirtualClinicRedux/AdminListAllPatients/adminListAllPatientsAction";
import { deletePatientAction } from "VirtualClinic/redux/VirtualClinicRedux/DeletePatient/deletePatientAction";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";

const PatientsScreen = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const dispatch: any = useDispatch();

  const currentAdminID = "65228d6a23d0c632b8998176";

  const { adminPatientsLoading, adminPatients } = useSelector(
    (state: RootState) => state.adminListAllPatientsReducer
  );

  const handleDeleteClick = async (email: any) => {
    await dispatch(deletePatientAction({ email: email }));
    await dispatch(adminListAllPatientsAction());
    notification.success({
      message: "Patient deleted Successfully",
      placement: "topRight",
    });
  };

  useEffect(() => {
    dispatch(adminListAllPatientsAction());
    console.log("All Patients", adminPatients);
  }, []);

  return (
    <div
      className={`w-full flex flex-col flex-wrap items-start justify-center pb-24`}
    >
      {adminPatientsLoading ? (
        <div className={`${styles.spinnerContainer}`}>
          <JellyLoader />
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-start items-center">
          {Array.isArray(adminPatients) &&
            adminPatients?.map((currPatient: any) => (
              <div
                key={currPatient._id}
                className={`${styles.packageItem} mt-5 mr-5`}
              >
                <div className="w-full flex justify-between items-center mb-2">
                  <h1>{currPatient?.name}</h1>
                  {/* <p className={`${styles.editLink}`}>Edit</p> */}
                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={() => handleDeleteClick(currPatient?.email)}
                  />
                </div>
                <p>Email: {currPatient?.email}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PatientsScreen;
