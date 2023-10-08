import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/rootReducer";
import { listDoctorSettingsAction } from "Redux/VirtualClinicRedux/ListDoctorSettings/listDoctorSettingsAction";
import { editSettingsAction } from "Redux/VirtualClinicRedux/EditSettings/editSettingsAction";

const SettingsScreen = () => {
  const dispatch: any = useDispatch();

  const { doctorSettingsLoading, doctorSettings } = useSelector(
    (state: RootState) => state.listDoctorSettingsReducer
  );

  const { editSettingsLoading, editSettings } = useSelector(
    (state: RootState) => state.editSettingsReducer
  );

  useEffect(() => {
    dispatch(listDoctorSettingsAction({ _id: "6520004fa6616c20bcc648d2" }));
  }, []);

  // Maintain separate state variables for each input field
  const [affiliation, setAffiliation] = useState(doctorSettings.affiliation || "");
  const [hourlyRate, setHourlyRate] = useState(doctorSettings.hourlyRate || "");
  const [email, setEmail] = useState(doctorSettings.email || "");

  const handleUpdate = (key:any, value:any) => {
    // Dispatch an action to send a request to the backend API
    const updateData = {
      _id: "6520004fa6616c20bcc648d2", // Assuming you always update the same doctor
      [key]: value,
    };
    dispatch(editSettingsAction(updateData));
  };

  return (
    <div className="w-full flex flex-col items-start justify-center">
      <h1>Doctor Settings Screen</h1>
      {doctorSettingsLoading ? (
        <h1>Loading...</h1>
      ) : (
        Object.keys(doctorSettings).map((key) => {
          const keysToSkip = ['_id', 'password'];

          if (keysToSkip.includes(key)) {
            return null;
          }
          const placeholders = {
            affiliation: "Enter updated affiliation",
            hourlyRate: "Enter updated hourly rate",
            email: "Enter updated email",
          };
          return (
            <div key={key} className="m-5">
              <h1>{key}</h1>
              <p>{doctorSettings[key]}</p>
              {["affiliation", "hourlyRate", "email"].includes(key) && (
                <>
                  <input
                    type="text"
                    placeholder={'enter update'}
                    value={key === "affiliation" ? affiliation : key === "hourlyRate" ? hourlyRate : email}
                    onChange={(e) => {
                      if (key === "affiliation") {
                        setAffiliation(e.target.value);
                      } else if (key === "hourlyRate") {
                        setHourlyRate(e.target.value);
                      } else if (key === "email") {
                        setEmail(e.target.value);
                      }
                    }}
                  />
                  <button onClick={() => handleUpdate(key, key === "affiliation" ? affiliation : key === "hourlyRate" ? hourlyRate : email)}>Edit</button>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SettingsScreen;