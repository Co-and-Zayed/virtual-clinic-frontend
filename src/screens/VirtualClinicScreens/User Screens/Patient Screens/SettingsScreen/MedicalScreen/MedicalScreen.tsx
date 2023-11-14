import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/MedicalScreen/MedicalScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { settingsPatient } from "utils/VirtualClinicUtils/navigationLinks";
import * as Routes from "Routes/VirtualClinicRoutes/paths";
import UploadButton from "components/UploadButton/UploadButton";
import RoundedButton from "components/RoundedButton/RoundedButton";
import { useFunctions } from "hooks/useFunctions";
import { UPDATE_USER_DATA } from "redux/User/loginTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";

const MedicalScreen = () => {
  const [medicalHistory, setMedicalHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  const { handleUpload } = useFunctions();
  const dispatch: any = useDispatch();

  const { userData } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    if (userData?.medicalHistory) {
      setMedicalHistory(userData?.medicalHistory);
    }
  }, [userData]);

  return (
    <>
      <div className={`${styles.settingsSection}`}>
        <h2 className={`${styles.subHeading}`}>Medical History</h2>
        <div className={`${styles.divider}`}></div>
        <UploadButton
          label="Upload Documents"
          fileList={medicalHistory}
          setFileList={setMedicalHistory}
          variant="DARK_GREEN"
          listType="VERTICAL"
        />
        <RoundedButton
          className="mt-5"
          text="Save"
          width={"8rem"}
          loading={historyLoading}
          onClick={async () => {
            setHistoryLoading(true);
            const res = await handleUpload({
              files: medicalHistory,
              endpoint: "patient/updateMedicalHistory",
              data: {
                createdAt: new Date(),
              },
            });
            setHistoryLoading(false);
            dispatch({ type: UPDATE_USER_DATA, payload: res.data.patient });
          }}
        />
      </div>
      <div className={`${styles.settingsSection}`}>
        <h2 className={`${styles.subHeading}`}>Health Records</h2>
        <div className={`${styles.divider}`}></div>
        <div>balabizo</div>
      </div>
    </>
  );
};

export default MedicalScreen;
