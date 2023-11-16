import styles from "screens/VirtualClinicScreens/User Screens/Patient Screens/SettingsScreen/PasswordScreen/PasswordScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState } from "react";
import { settingsPatient } from "utils/VirtualClinicUtils/navigationLinks";
import * as Routes from "Routes/VirtualClinicRoutes/paths";
import InputField from "components/InputField/InputField";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { notification } from "antd";
import SubmitButton from "components/SubmitButton/SubmitButton";

const PasswordScreen = () => {
  const { userData, accessToken, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values: ChangePassModel) => {
      var errorExists = false;

      var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (formik.values.password.trim() === "") {
        formik.setFieldError("password", "Please enter your password");
        errorExists = true;
      } else if (!regex.test(formik.values.password.toString())) {
        formik.setFieldError(
          "password",
          "Password should have atleast 1 capital letter, 1 number, and 1 special character"
        );
        errorExists = true;
      }

      // check if password and confirm password are same
      if (values.password !== values.confirmPassword) {
        formik.setFieldError("confirmPassword", "Passwords do not match");
        errorExists = true;
      }

      if (!errorExists) {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_CLINIC}${
            userType === "PATIENT" ? "patient" : "adminAPI"
          }/changePassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              oldPassword: values.oldPassword,
              newPassword: values.password,
            }),
          }
        );

        const data = await res.json();

        // check if not success, then show error notification
        if (!data.success) {
          notification.error({
            message: "Error",
            description: data.message,
          });
          setLoading(false);
          return;
        }

        // show success notification
        notification.success({
          message: "Success",
          description: data.message,
        });

        // reset form
        formik.resetForm();

        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className={`${styles.settingsSection}`}>
        <h2 className={`${styles.subHeading}`}>Change Password</h2>
        <div className={`${styles.divider}`}></div>
        {/* body */}
        <div className="w-[15rem] flex flex-col">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-y-3"
          >
            <InputField
              title="Old Password"
              name="oldPassword"
              status={formik.errors.oldPassword ? "error" : ""}
              error={formik.errors.oldPassword}
              onChange={formik.handleChange}
              value={formik.values.oldPassword}
              isPassword
              titleColor="black"
            />
            <InputField
              title="New Password"
              name="password"
              status={formik.errors.password ? "error" : ""}
              error={formik.errors.password}
              onChange={formik.handleChange}
              value={formik.values.password}
              isPassword
              titleColor="black"
            />
            <InputField
              title="Confirm Password"
              name="confirmPassword"
              status={formik.errors.confirmPassword ? "error" : ""}
              error={formik.errors.confirmPassword}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              isPassword
              titleColor="black"
            />

            <SubmitButton
              text={loading ? "Loading..." : "Change Password"}
              onClick={formik.handleSubmit}
              style={{
                backgroundColor: "var(--dark-green)",
              }}
            />
          </form>
        </div>
      </div>
    </>
  );

  interface ChangePassModel {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }
};

export default PasswordScreen;
