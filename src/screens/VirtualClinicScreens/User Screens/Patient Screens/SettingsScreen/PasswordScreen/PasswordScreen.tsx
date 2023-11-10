import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/PasswordScreen/PasswordScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { settingsPatient } from "utils/VirtualClinicUtils/navigationLinks";
import * as Routes from "Routes/VirtualClinicRoutes/paths";
import { Button, Input, Space, Table, InputRef, Select, Form } from "antd";
import type { FormInstance } from "antd/es/form";
import layout from "antd/es/layout";
import { RootState } from "redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { editPatientSettingsAction } from "redux/VirtualClinicRedux/EditPatientSettings/editPatientSettingsAction";
//import { editPatientSettingsReducer } from "redux/VirtualClinicRedux/EditPatientSettings/editPatientSettingsReducer";

const PasswordScreen = () => {
  const dispatch: any = useDispatch();
  // const { editPatientSettingsLoading,editPatientSettings} = useSelector(
  //   (state: RootState) => state.editPatientSettingsReducer
  // );

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [formData, setFormData] = useState({
    cpassword: "", //current
    password: "", //new
    password2: "", //confirm new
  });

  //  useEffect(() => {
  //   dispatch(editPatientSettingsAction());

  // }, []);

  const { cpassword, password, password2 } = formData;
  const [validPassword, setValidPassword] = useState(false);

  const hasUpperCase = (pass: any) => {
    return /[A-Z]/.test(pass);
  };

  // Function to check if the new password has at least 1 number
  const hasNumber = (pass: any) => {
    return /\d/.test(pass);
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name);
    if (e.target.name === "password") {
      if (
        e.target.value.length < 6 ||
        !hasUpperCase(e.target.value) ||
        !hasNumber(e.target.value)
      ) {
        setValidPassword(false);
        console.log(e.target.value);
      } else setValidPassword(true);
    }
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const handleclick = async () => {
    await dispatch(
      editPatientSettingsAction({
        cpassword: cpassword,
        password: password,
        password2: password2,
      })
    );
  };

  return (
    <>
      <div className={`${styles.settingsSection}`}>
        <h2 className={`${styles.subHeading}`}>Change Password</h2>
        <div className={`${styles.divider}`}></div>

        <form onSubmit={onSubmit} {...layout} style={{ maxWidth: 700 }}>
          <div className="form-group">
            <h1> Current Password </h1>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              required={true}
              value={cpassword}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <h1> New Password </h1>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required={true}
              value={password}
              onChange={onChange}
            />
            {!validPassword && (
              <p>
                New password must be at least 6 characters long, has atleast 1
                number and 1 capital letter
              </p>
            )}
          </div>
          <div className="form-group">
            <h1> Confirm Password </h1>
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              required={true}
              value={password2}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="px-6 py-2"
              style={{
                backgroundColor: "green",
                borderRadius: "0.2rem",
              }}
              onClick={handleclick}
            >
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PasswordScreen;
