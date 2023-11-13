import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { listDoctorSettingsAction } from "redux/VirtualClinicRedux/ListDoctorSettings/listDoctorSettingsAction";
import { editSettingsAction } from "redux/VirtualClinicRedux/EditSettings/editSettingsAction";
import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/SettingsScreen/SettingsScreen.module.css";
import JellyLoader from "components/JellyLoader/JellyLoader";

const SettingsScreen = () => {
  const dispatch: any = useDispatch();
  
  const { doctorSettingsLoading, doctorSettings } = useSelector(
    (state: RootState) => state.listDoctorSettingsReducer
  );

  const { editSettingsLoading, editSettings } = useSelector(
    (state: RootState) => state.editSettingsReducer
  );
  const { userData } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    dispatch(listDoctorSettingsAction({ _id: userData?._id }));
  }, []);

  useEffect(() => {
    // Re-fetch the data from the database
    dispatch(listDoctorSettingsAction({ _id: userData?._id }));
  }, [editSettings]); //
  const [affiliation, setAffiliation] = useState(
    doctorSettings?.affiliation || " "
  );
  const [hourlyRate, setHourlyRate] = useState(
    doctorSettings?.hourlyRate || " "
  );
  const [email, setEmail] = useState(doctorSettings?.email || " ");

  const handleUpdate = (key: any, value: any) => {
    const updateData = {
      _id: userData?._id, // Assuming you always update the same doctor
      [key]: value,
    };
    dispatch(editSettingsAction(updateData));
  };


  const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      if (name === 'oldPassword') setOldPassword(value);
      else if (name === 'newPassword') setNewPassword(value);
      else if (name === 'confirmPassword') setConfirmPassword(value);
    };
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
  
      // Basic validation
      if (newPassword !== confirmPassword) {
        setMessage('New password and confirm password do not match.');
        return;
      }
  
      console.log('Old Password:', oldPassword);
      console.log('New Password:', newPassword);
      console.log('Confirm Password:', confirmPassword);
  
      // Clear the form and display a success message
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage('Password changed successfully.');
    };
  
   

  return (
    
    <div className="w-full flex flex-col items-start justify-center">
      <h1>Doctor Settings Screen</h1>
      {doctorSettingsLoading ? (
  <JellyLoader />
) : doctorSettings !== null && typeof doctorSettings === "object" ? (
  Object.keys(doctorSettings)?.map((key: string) => {
    const keysToSkip = ["_id", "password", "__v"];

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
              className={`${styles.customButton}`}
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
)}

      <div>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Old Password:
            <input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            New Password:
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Confirm New Password:
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Change Password</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    </div>
  );
};
}
export default SettingsScreen;
