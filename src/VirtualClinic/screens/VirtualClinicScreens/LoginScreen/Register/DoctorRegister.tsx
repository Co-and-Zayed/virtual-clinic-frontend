import styles from "screens/VirtualClinicScreens/LoginScreen/LoginScreen2.module.css";
import inputStyles from "VirtualClinic/components/InputField/InputField.module.css";
import { DatePicker, Input, Select, Spin, Upload } from "antd";
import { useFormik } from "formik";
import DoctorRegisterModel from "VirtualClinic/models/DoctorRegisterModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useNav } from "VirtualClinic/hooks/useNav";
import { regsiterAction } from "VirtualClinic/redux/Register/registerAction";
import Back from "VirtualClinic/assets/images/back.svg";
import SubmitButton from "VirtualClinic/components/SubmitButton/SubmitButton";
import { FC, useState } from "react";
import InputField from "VirtualClinic/components/InputField/InputField";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import UploadButton from "VirtualClinic/components/UploadButton/UploadButton";

interface DoctorRegisterProps {
  backFn: () => void;
}

const DoctorRegister: FC<DoctorRegisterProps> = ({ backFn }) => {
  const navigate = useNav();

  const [section, setSection] = useState(1);

  const [dateOfBirth, setDateOfBirth] = useState<any>(null);

  const [fileList, setFileList] = useState<any[]>([]); // Initialize as an empty array

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

  const dispatch: any = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
      specialty: "",
      date_of_birth: "",
      affiliation: "",
      educationalBackground: "",
      hourlyRate: "",
    },
    onSubmit: async (values: DoctorRegisterModel) => {
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
        console.log("date");
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
      console.log("ERROR EXISTS: ", errorExists);
      // console.log("CHECKS BOOL: ", checks);
      console.log("SECTION: ", section);

      // SECTION 1
      if (section === 1 && !errorExists) {
        setSection(2);
        return;
      }

      if (values.gender.trim() === "") {
        // console.log("gender");
        formik.setFieldError("gender", "Please enter your gender");
        errorExists = true;
      }
      if (values.specialty.trim() === "") {
        // console.log("specialty");
        formik.setFieldError("specialty", "Please enter your specialty");
        errorExists = true;
      }

      if (values.affiliation.trim() === "") {
        formik.setFieldError("affiliation", "Please enter your affiliation");
        errorExists = true;
      }
      if (values.educationalBackground.trim() === "") {
        formik.setFieldError(
          "educationalBackground",
          "Please enter your educational background"
        );
        errorExists = true;
      }
      if (values.hourlyRate.trim() === "") {
        formik.setFieldError("hourlyRate", "Please enter your hourly rate");
        errorExists = true;
      }

      console.log("ERROR EXISTS AFTER ALL: ", errorExists);

      if (!errorExists) {
        const dateParts = values.date_of_birth.split("/");
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        const dateObject = new Date(formattedDate);
        await dispatch(
          regsiterAction({
            name: values.name,
            email: values.email,
            type: "DOCTOR",
            username: values.username,
            password: values.password,
            gender: values.gender,
            specialty: values.specialty,
            date_of_birth: dateObject,
            affiliation: values.affiliation,
            educationalBackground: values.educationalBackground,
            hourlyRate: values.hourlyRate,
            files: fileList,
            createdAt: new Date(),
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
        <p className="text-xl font-bold greenText">Doctor</p>
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
          //Section 2
          <div className={`${styles.inputGrid}`}>
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
                  dropdownStyle={{
                    fontFamily: "Century Gothic",
                    fontWeight: "normal",
                  }}
                />
              }
            />
            <InputField
              title="Specialty"
              name="specialty"
              status={formik.errors.specialty ? "error" : ""}
              error={formik.errors.specialty}
              onChange={formik.handleChange}
              value={formik.values.specialty}
            />
            <InputField
              title="Hourly Rate"
              name="hourlyRate"
              status={formik.errors.hourlyRate ? "error" : ""}
              error={formik.errors.hourlyRate}
              onChange={formik.handleChange}
              value={formik.values.hourlyRate}
              suffix="EGP / Hr"
            />
            <InputField
              title="Affiliation"
              name="affiliation"
              status={formik.errors.affiliation ? "error" : ""}
              error={formik.errors.affiliation}
              onChange={formik.handleChange}
              value={formik.values.affiliation}
            />
            <InputField
              title="Educational Background"
              name="educationalBackground"
              status={formik.errors.educationalBackground ? "error" : ""}
              error={formik.errors.educationalBackground}
              onChange={formik.handleChange}
              value={formik.values.educationalBackground}
            />
            <div className="w-full h-full flex items-center justify-start">
              <UploadButton fileList={fileList} setFileList={setFileList} />
            </div>
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

export default DoctorRegister;
