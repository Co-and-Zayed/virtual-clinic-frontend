import styles from "Pharmacy/screens/User Screens/Admin Screens/PatientsScreen/PatientsScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Pharmacy/redux/rootReducer";
import { Input, notification, Spin, Table } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { adminListAllPatientsAction } from "Pharmacy/redux/PharmacyRedux/AdminListAllPatients/adminListAllPatientsAction";
import { deletePatientAction } from "Pharmacy/redux/PharmacyRedux/DeletePatient/deletePatientAction";

const PatientsScreen = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const dispatch: any = useDispatch();

  const currentAdminID = "65228d6a23d0c632b8998176";

  const { adminPatientsLoading, adminPatients } = useSelector(
    (state: RootState) => state.adminListAllPatientsReducer
  );

  const handleDeleteClick = async (username: any) => {
    await dispatch(deletePatientAction({ username: username }));
    await dispatch(adminListAllPatientsAction());
    notification.success({
      message: "Patient deleted Successfully",
      placement: "topRight",
    });
  };

  useEffect(() => {
    dispatch(adminListAllPatientsAction());
  }, []);

  return (
    <div
      className={`w-full flex flex-col flex-wrap items-start justify-center pb-24`}
    >
      {adminPatientsLoading ? (
        <div className={`${styles.spinnerContainer}`}>
          <Spin indicator={antIcon} />
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
                    onClick={() => handleDeleteClick(currPatient?.username)}
                  />
                </div>
                <p>Username: {currPatient?.username}</p>
                <p>Email: {currPatient?.email}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PatientsScreen;
