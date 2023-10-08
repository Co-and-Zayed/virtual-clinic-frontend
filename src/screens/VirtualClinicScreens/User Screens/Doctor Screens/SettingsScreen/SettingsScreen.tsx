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

  useEffect(() => {
    // Re-fetch the data from the database
    dispatch(listDoctorSettingsAction({ _id: "6520004fa6616c20bcc648d2" }));
  }, [editSettings]); //

  const [affiliation, setAffiliation] = useState(doctorSettings?.affiliation || " ");
  const [hourlyRate, setHourlyRate] = useState(doctorSettings?.hourlyRate || " ");
  const [email, setEmail] = useState(doctorSettings?.email || " ");

  const handleUpdate = (key: any, value: any) => {
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
        (doctorSettings !== null && typeof doctorSettings === "object") ? (
          Object.keys(doctorSettings).map((key: string) => {
            const keysToSkip = ['_id', 'password'];

            if (keysToSkip.includes(key)) {
              return null;
            }

            const placeholders: { [key: string]: string } = {
              affiliation: "Enter updated value",
              hourlyRate: "Enter updated value",
              email: "Enter updated value",
            };
            return (
              <div key={key} className="m-5">
                <h1>{key}</h1>
                <p>{doctorSettings[key]}</p>
                {["affiliation", "hourlyRate", "email"].includes(key) && (
                  <>
                    <input
                      type="text"
                      placeholder={placeholders[key]}
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

                    <button
                      onClick={() =>
                        handleUpdate(
                          key,
                          key === "affiliation"
                            ? affiliation
                            : key === "hourlyRate"
                            ? hourlyRate
                            : email
                        )
                      }
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <p>No doctor settings data available.</p>
        )
      )}
    </div>
  );
};

export default SettingsScreen;
