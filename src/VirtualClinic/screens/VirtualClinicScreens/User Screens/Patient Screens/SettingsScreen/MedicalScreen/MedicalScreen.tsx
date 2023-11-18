import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/MedicalScreen/MedicalScreen.module.css";
import { useNav } from "VirtualClinic/hooks/useNav";
import { useEffect, useState } from "react";
import { settingsPatient } from "VirtualClinic/utils/navigationLinks";
import * as Routes from "VirtualClinic/Routes/VirtualClinicRoutes/paths";
import UploadButton from "VirtualClinic/components/UploadButton/UploadButton";
import RoundedButton from "VirtualClinic/components/RoundedButton/RoundedButton";
import { useFunctions } from "hooks/useFunctions";
import { useRequests } from "hooks/useRequests";
import { UPDATE_USER_DATA } from "VirtualClinic/redux/User/loginTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import {
  UploadOutlined,
  PaperClipOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const MedicalScreen = () => {
  const [newMedicalHistory, setNewMedicalHistory] = useState<any[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [healthRecords, setHealthRecords] = useState<any>(null);

  const { handleUpload } = useFunctions();
  const { updateUserData } = useRequests();
  const dispatch: any = useDispatch();

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.userReducer
  );

  useEffect(() => {
    updateUserData();
    getHealthRecords();
  }, []);

  useEffect(() => {
    if (userData?.medicalHistory) {
      setMedicalHistory(userData?.medicalHistory);
    }
  }, [userData]);

  const getHealthRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_CLINIC}Patient/getHealthRecords`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      console.log(data.healthRecords);
      console.log("Fetched", data);

      if (response.ok) {
        setLoading(false);
        setHealthRecords(data.healthRecords);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderFiles = (fileList: any) => {
    return fileList?.map((file: any) => (
      <div
        className={`${styles.uploadedFiles} w-full flex items-center justify-between`}
      >
        <p>
          <PaperClipOutlined />
          <span>{file?.name ?? file.split("$__$")[1]}</span>
        </p>
      </div>
    ));
  };

  return (
    <div className="w-full flex flex-col">
      <div className={`${styles.settingsSection}`}>
        <h2 className={`${styles.subHeading}`}>Medical History</h2>
        <div className={`${styles.divider}`}></div>
        <div className="h-[fit-content] flex items-stretch">
          <div>
            <UploadButton
              label="Upload Documents"
              fileList={newMedicalHistory}
              setFileList={setNewMedicalHistory}
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
                  files: newMedicalHistory,
                  endpoint: "patient/updateMedicalHistory",
                  data: {
                    createdAt: new Date(),
                  },
                });
                setHistoryLoading(false);
                updateUserData();
              }}
            />
          </div>

          {medicalHistory?.length > 0 && (
            <>
              <div className="ml-5 w-[0.075rem] bg-gray-400"></div>
              <div className="ml-5 flex flex-col">
                {renderFiles(medicalHistory)}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`${styles.settingsSection}`}>
        <h2 className={`${styles.subHeading}`}>Health Records</h2>
        <div className={`${styles.divider}`}></div>

        {loading ? (
          <JellyLoader />
        ) : (
          <div>
            {healthRecords.map((record: any, index: any) => (
              <div>
                <h1>Health Record {index + 1}</h1>
                <p>{record}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalScreen;
