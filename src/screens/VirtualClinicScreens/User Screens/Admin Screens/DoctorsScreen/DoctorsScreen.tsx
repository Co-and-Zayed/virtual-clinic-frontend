import styles from "screens/VirtualClinicScreens/User Screens/Admin Screens/DoctorsScreen/DoctorsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { Input, notification, Spin, Table } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { adminListAllDoctorsAction } from "redux/VirtualClinicRedux/AdminListAllDoctors/adminListAllDoctorsAction";
import { deleteDoctorAction } from "redux/VirtualClinicRedux/DeleteDoctor/deleteDoctorAction";
import JellyLoader from "components/JellyLoader/JellyLoader";

const DoctorsScreen = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const dispatch: any = useDispatch();

  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState<any>();

  const { adminDoctorsLoading, adminDoctors } = useSelector(
    (state: RootState) => state.adminListAllDoctorsReducer
  );

  const handleDeleteClick = async (email: any) => {
    await dispatch(deleteDoctorAction({ email: email }));
    await dispatch(adminListAllDoctorsAction());
    notification.success({
      message: "Doctor deleted Successfully",
      placement: "topRight",
    });
    setShowDoctorDetails(false);
    setCurrentDoctor(null);
  };

  useEffect(() => {
    console.log("Sending Request");
    dispatch(adminListAllDoctorsAction());
    setShowDoctorDetails(false);
    setCurrentDoctor(null);
    console.log("All Doctors", adminDoctors);
  }, []);

  return (
    <div
      className={`w-full flex flex-col flex-wrap items-start justify-center pb-24`}
    >
      {adminDoctorsLoading ? (
        <div className={`${styles.spinnerContainer}`}>
          <JellyLoader />
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-start items-center">
          {Array.isArray(adminDoctors) &&
            adminDoctors?.map((currDoctor: any) => (
              <div
                key={currDoctor._id}
                className={`${styles.packageItem} mt-5 mr-5`}
                onClick={() => {
                  setCurrentDoctor(currDoctor);
                  setShowDoctorDetails(true);
                }}
              >
                <div className="w-full flex justify-between items-center mb-2">
                  <h1
                    style={
                      currDoctor?.name === currentDoctor?.name
                        ? { color: "green" }
                        : {}
                    }
                  >
                    {currDoctor?.name}
                  </h1>
                  {/* <p className={`${styles.editLink}`}>Edit</p> */}
                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={() => handleDeleteClick(currDoctor?.email)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p>Email: {currDoctor?.email}</p>
                  {/* If status is PENDING show pending in a rounded container */}
                  {currDoctor?.status && currDoctor?.status === "PENDING" && (
                    <div
                      className={`flex justify-center items-center rounded-md bg-yellow-100 px-2 py-1`}
                    >
                      <p>Pending</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
      {showDoctorDetails && (
        <div className="mt-12">
          <h1>{currentDoctor?.name}</h1>
          <p>Email: {currentDoctor?.email}</p>
          <p>Speciality: {currentDoctor?.specialty}</p>
          <p>Affiliation: {currentDoctor?.affiliation}</p>
          <p>Educational Background: {currentDoctor?.educationalBackground}</p>
          <p>Hourly rate: EGP {currentDoctor?.hourlyRate} / hr</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsScreen;
