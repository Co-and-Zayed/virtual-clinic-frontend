import styles from "VirtualClinic/screens/VirtualClinicScreens/LoginScreen/LoginScreen2.module.css";
import inputStyles from "VirtualClinic/components/InputField/InputField.module.css";
import { DatePicker, Input, Select, Spin } from "antd";
import { useFormik } from "formik";
import PatientRegisterModel from "VirtualClinic/models/PatientRegisterModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useNav } from "VirtualClinic/hooks/useNav";
import { regsiterAction } from "VirtualClinic/redux/Register/registerAction";
import Back from "VirtualClinic/assets/images/back.svg";
import SubmitButton from "VirtualClinic/components/SubmitButton/SubmitButton";
import { FC, useEffect, useState } from "react";
import InputField from "VirtualClinic/components/InputField/InputField";
import moment from "moment";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";

interface PatientRegisterProps {
  backFn: () => void;
}

const PatientRegister: FC<PatientRegisterProps> = ({ backFn }) => {
  const navigate = useNav();

  const [section, setSection] = useState(1);

  const [dateOfBirth, setDateOfBirth] = useState<any>(null);

  // const [fields, setFields] = useState({
  //   name: "",
  //   email: "",
  //   username: "",
  //   dateOfBirth: "",
  //   password: "",
  //   confirmPassword: "",
  //   hourlyRate: "",
  //   affiliation: "",
  //   educationalBackground: "",
  // });

  const { registerLoading } = useSelector(
    (state: RootState) => state.registerReducer
  );

  useEffect(() => {
    dispatch({ type: "REGISTER_LOADING" });
  }, []);

  const dispatch: any = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      date_of_birth: "",
      password: "",
      confirmPassword: "",

      gender: "",
      mobileNumber: "",
      healthRecords: "",
      emergencyContactName: "",
      emergenyContactNumber: "",
    },
    onSubmit: async (values: PatientRegisterModel) => {
      // check for name, email, username, password, confirm password
      var errorExists = false;
      if (
        formik.values.name.trim() === "" ||
        formik.values.name === undefined ||
        formik.values.name === null
      ) {
        formik.setFieldError("name", "Please enter your name");

        errorExists = true;
      }
      // the input type is email, so it will automatically check for email format
      if (formik.values.email.trim() === "") {
        formik.setFieldError("email", "Please enter your email");
        errorExists = true;
      }
      if (formik.values.username.trim() === "") {
        formik.setFieldError("username", "Please enter your username");
        errorExists = true;
      }
      if (values.date_of_birth.trim() === "") {
        formik.setFieldError(
          "date_of_birth",
          "Please enter your date of birth"
        );
        errorExists = true;
      }
      // password should atleast have 1 capital letter, 1 small letter, 1 number, 1 special character
      // regex
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

      if (formik.values.password !== formik.values.confirmPassword) {
        formik.setFieldError("confirmPassword", "Passwords do not match");
        errorExists = true;
      }

      //

      if (section === 1 && !errorExists) {
        setSection(2);
        return;
      }

      ///////////////
      // SECTION 2 //
      ///////////////

      if (values.gender.trim() === "") {
        //
        formik.setFieldError("gender", "Please enter your gender");
        errorExists = true;
      }
      if (values.mobileNumber.trim() === "") {
        //
        formik.setFieldError("mobileNumber", "Please enter your mobile number");
        errorExists = true;
      }
      if (values.healthRecords.trim() === "") {
        //
        formik.setFieldError(
          "healthRecords",
          "Please enter your health records"
        );
        errorExists = true;
      }
      if (values.emergencyContactName.trim() === "") {
        //
        formik.setFieldError(
          "emergencyContactName",
          "Please enter your emergency contact name"
        );
        errorExists = true;
      }
      if (values.emergenyContactNumber.trim() === "") {
        //
        formik.setFieldError(
          "emergenyContactNumber",
          "Please enter your emergency contact number"
        );
        errorExists = true;
      }

      if (!errorExists) {
        const dateParts = values.date_of_birth.split("/");
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        const dateObject = new Date(formattedDate);

        await dispatch(
          regsiterAction({
            name: values.name,
            email: values.email,
            type: "PATIENT",
            username: values.username,
            password: values.password,
            date_of_birth: dateObject,
            gender: values.gender,
            mobileNumber: values.mobileNumber,
            healthRecords: values.healthRecords,
            emergencyContactName: values.emergencyContactName,
            emergencyContactNumber: values.emergenyContactNumber,
            // files: patientFiles,
          })
        );
        navigate("/dashboard");
      }
    },
  });

  const GENDER_VALUES = [
    {
      label: "Male",
      value: "MALE",
    },
    {
      label: "Female",
      value: "FEMALE",
    },
  ];

  // FIELDS:
  // Section 1:
  // name, email, username, dob, password, confirm password
  // Section 2:
  // Hourly rate, affiliation, Educational bg

  return (
    <div
      className="flex flex-col items-center gap-y-3"
      style={{ width: "35rem" }}
    >
      <div
        className={`w-full flex items-center gap-x-4 pb-3 ${styles.titleRow}`}
      >
        <img
          src={Back}
          className="h-[1rem]"
          alt="back"
          onClick={
            section === 1
              ? () => backFn()
              : () => {
                  setSection(1);
                }
          }
          style={{ cursor: "pointer" }}
        />
        <p className="text-xl font-bold greenText">Patient</p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col items-center"
      >
        {section === 1 ? (
          // Section 1
          <div className={`${styles.inputGrid}`}>
            <InputField
              title="Name"
              name="name"
              status={formik.errors.name ? "error" : ""}
              error={formik.errors.name}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <InputField
              title="Email"
              name="email"
              type="email"
              status={formik.errors.email ? "error" : ""}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <InputField
              title="Username"
              name="username"
              status={formik.errors.username ? "error" : ""}
              error={formik.errors.username}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <InputField
              title="Date of Birth"
              name="date_of_birth"
              customInput={
                <DatePicker
                  format={"DD/MM/YYYY"}
                  className={`${inputStyles.inputField}`}
                  placeholder=""
                  value={dateOfBirth}
                  status={formik.errors.date_of_birth ? "error" : ""}
                  onChange={(date: any, dateString: any) => {
                    formik.setFieldValue("date_of_birth", dateString);
                    setDateOfBirth(date);
                  }}
                />
              }
              error={formik.errors.date_of_birth}
            />

            <InputField
              title="Password"
              name="password"
              status={formik.errors.password ? "error" : ""}
              error={formik.errors.password}
              onChange={formik.handleChange}
              value={formik.values.password}
              isPassword
            />
            <InputField
              title="Confirm Password"
              name="confirmPassword"
              status={formik.errors.confirmPassword ? "error" : ""}
              error={formik.errors.confirmPassword}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              isPassword
            />
          </div>
        ) : (
          //Section 2 :
          // gender,
          // mobileNumber,
          // healthRecords,
          // emergencyContactName,
          // emergenyContactNumber
          <div className={`${styles.inputGrid}`}>
            {/* gender */}
            <InputField
              title="Gender"
              error={formik.errors.gender}
              customInput={
                <Select
                  status={formik.errors.gender ? "error" : ""}
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                  options={GENDER_VALUES}
                  onSelect={(value: any) => {
                    formik.setFieldValue("gender", value);
                  }}
                  className={`${inputStyles.inputField}`}
                  style={{
                    paddingInline: "0",
                  }}
                  dropdownStyle={
                    // color of backgroung
                    {
                      fontFamily: "Century Gothic",
                      fontWeight: "normal",
                      // backgroundColor: "var(--dark-green)",
                      // accentColor: "var(--dark-green)",
                      // color of selected item
                      // color: "var(--white)",
                    }
                  }
                />
              }
            />

            {/* mobile number */}
            <InputField
              title="Mobile Number"
              name="mobileNumber"
              type="tel"
              status={formik.errors.mobileNumber ? "error" : ""}
              error={formik.errors.mobileNumber}
              onChange={formik.handleChange}
              value={formik.values.mobileNumber}
            />

            {/* health records */}
            <InputField
              title="Health Records"
              name="healthRecords"
              status={formik.errors.healthRecords ? "error" : ""}
              error={formik.errors.healthRecords}
              onChange={formik.handleChange}
              value={formik.values.healthRecords}
            />

            {/* emergency contact name */}
            <InputField
              title="Emergency Contact Name"
              name="emergencyContactName"
              status={formik.errors.emergencyContactName ? "error" : ""}
              error={formik.errors.emergencyContactName}
              onChange={formik.handleChange}
              value={formik.values.emergencyContactName}
            />

            {/* emergency contact number */}
            <InputField
              title="Emergency Contact Number"
              name="emergenyContactNumber"
              status={formik.errors.emergenyContactNumber ? "error" : ""}
              error={formik.errors.emergenyContactNumber}
              onChange={formik.handleChange}
              value={formik.values.emergenyContactNumber}
            />
          </div>
        )}

        {section === 1 ? (
          <SubmitButton
            text="Next"
            className="px-6 py-2 mt-12"
            // onClick={() => {
            //   if (!checkSection1Errors()) {
            //     setSection(2);
            //   }
            // }}
          />
        ) : registerLoading ? (
          <JellyLoader />
        ) : (
          <SubmitButton text="Register" className="px-6 py-2 mt-12" />
        )}
      </form>
    </div>
  );
};

export default PatientRegister;
