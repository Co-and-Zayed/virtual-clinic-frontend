import styles from "VirtualClinic/screens/VirtualClinicScreens/LoginScreen/LoginScreen2.module.css";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ConfigProvider, Input, Spin, theme } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import LoginModel from "VirtualClinic/models/LoginModel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useNav } from "VirtualClinic/hooks/useNav";
import { loginAction } from "VirtualClinic/redux/User/userAction";
import Logo from "VirtualClinic/assets/images/Logo.svg";
import Doctor from "VirtualClinic/assets/images/Doctor.svg";
import Patient from "VirtualClinic/assets/images/Patient.svg";
import DoctorRegister from "./Register/DoctorRegister";
import PatientRegister from "./Register/PatientRegister";
import SubmitButton from "VirtualClinic/components/SubmitButton/SubmitButton";
import InputField from "VirtualClinic/components/InputField/InputField";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import { LOGIN_LOADING } from "VirtualClinic/redux/User/loginTypes";

const LoginScreen2 = () => {
  const navigate = useNav();

  const dispatch: any = useDispatch();

  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  useEffect(() => {
    dispatch({ type: LOGIN_LOADING, payload: false });
  }, []);

  const [page, setPage] = useState("login");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values: LoginModel) => {
      var errorExists = false;
      if (values.username.trim() === "") {
        formik.setFieldError("email", "Enter Email");
        errorExists = true;
      }
      if (values.password.trim() === "") {
        formik.setFieldError("password", "Enter Password");
        errorExists = true;
      }
      if (!errorExists) {
        await dispatch(
          loginAction({
            username: values.username,
            password: values.password,
          })
        );
      }
    },
  });

  const navigateToMainScreen = () => {
    if (userType === "DOCTOR" || userType === "PATIENT") {
      navigate("/dashboard");
    } else if (userType === "ADMIN") {
      navigate("/admins");
    }
    console.log("USER TYPE WHEN NAVIGATING: ", userType);
  };

  useEffect(() => {
    navigateToMainScreen();
  }, [userType]);

  useEffect(() => {
    document.body.style.backgroundColor = "var(--dark-green)";
  }, []);

  function pageContent() {
    switch (page) {
      // login, doctor, patient
      case "login":
        return renderLogin();
      case "doctor":
        return renderDoctor();
      case "patient":
        return renderPatient();
    }
  }

  function renderLogin() {
    return (
      <div
        className="h-full flex justify-center gap-x-20"
        style={{
          // width: preffered: 75%, min: 1080px, max: 1440px
          width: "clamp(1250px, 75vw, 1800px)",
        }}
      >
        {/* REGISTER */}
        <div className="w-[40rem] flex flex-col">
          <h2 className={`${styles.h2} mb-[2rem]`}>Register</h2>
          <div className="flex justify-between flex-1">
            {/* DOCTOR */}
            <div
              className={`${styles.registerCard} gap-y-14`}
              onClick={() => setPage("doctor")}
            >
              <img
                src={Doctor}
                alt="Doctor"
                className={`w-[7rem] h-[7rem] ${styles.registerCardImage}`}
              />
              <h1 className={styles.h1}>Doctor</h1>
              <div className={`${styles.registerCardCircle}`}></div>
            </div>
            {/* PATIENT */}
            <div
              className={`${styles.registerCard} gap-y-14`}
              onClick={() => setPage("patient")}
            >
              <div className={`${styles.registerCardCircle}`}></div>
              <img
                src={Patient}
                alt="Patient"
                className={`w-[7rem] h-[7rem] ${styles.registerCardImage}`}
              />
              <h1 className={styles.h1}>Patient</h1>
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="h-full w-[1.25px]">
          <div className="h-[4rem]" />
          <div
            className="w-[1.25px]"
            style={{
              height: "calc(100% - 4rem)",
              backgroundColor: "var(--light-green)",
              opacity: 0.4,
            }}
          />
        </div>

        {/* Login Form */}
        <div className="w-[20rem] flex flex-col items-start">
          <h2 className={`${styles.h2} mb-[2rem]`}>Login</h2>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-start gap-y-3"
          >
            <div className="w-full flex flex-col items-start gap-y-2">
              <InputField
                title="Username"
                name="username"
                // placeholder="Username"
                status={formik.errors.username ? "error" : ""}
                onChange={formik.handleChange}
                className={`${styles.inputField}`}
              />
              {formik.errors.username && (
                <p className="text-[red]">Please Enter Username</p>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-y-2 mb-6">
              <InputField
                title="Password"
                name="password"
                isPassword
                noErrorSection
                status={formik.errors.password ? "error" : ""}
                onChange={formik.handleChange}
                className={`${styles.inputField}`}
              />
              {formik.errors.password && (
                <p className="text-[red]">Please Enter Password</p>
              )}
              <div
                className="w-full flex flex-row items-center justify-start gap-x-1 "
                style={{ fontSize: "0.75rem", opacity: 0.7 }}
              >
                <p className="text-[white]">Forgot your password? Click </p>
                <a
                  className="hover:cursor-pointer greenText"
                  href="/reset-password"
                >
                  <u>here</u>
                </a>
              </div>
            </div>

            {loginLoading ? (
              <div className="w-full flex items-center justify-center">
                <JellyLoader color={"var(--light-green)"} />
              </div>
            ) : (
              <SubmitButton text="Login" className="w-full" />
            )}
          </form>
        </div>
      </div>
    );
  }

  function renderDoctor() {
    return <DoctorRegister backFn={() => setPage("login")} />;
  }

  function renderPatient() {
    return <PatientRegister backFn={() => setPage("login")} />;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],

        token: {
          colorPrimary: "var(--light-green)",
          colorBgContainer: "transparent",
        },

        // Input Component
        components: {
          Input: {
            // colorBgContainer: "#00000000",
          },
          DatePicker: {
            // colorBgContainer: "#00000000",
          },
          Select: {
            // colorBgContainer: "transparent",
            // colorText: "var(--blue)",
          },
        },
      }}
    >
      <div
        className={`${styles.background} w-full h-[100vh] flex flex-col justify-center items-center`}
      >
        {/* Logo */}
        <img src={Logo} alt="Logo" className="w-[5rem] mb-12" />

        {/* PAGE CONTENT */}
        <div className="h-[28rem]">{pageContent()}</div>

        {/* Invisible Spacer */}
        <div className="h-[7rem]" />
      </div>

      {/* Horizontal footer with "Virtual Clinic" in the center */}
      <div
        className={`w-full flex flex-row justify-center items-center gap-x-2 ${styles.footer}`}
      >
        <div
          className="w-full h-[1.25px]"
          style={{ backgroundColor: "var(--light-green)" }}
        />
        <p className={`${styles.greenText} px-6 greenText`}>Virtual Clinic</p>
        <div
          className="w-full h-[1.25px]"
          style={{ backgroundColor: "var(--light-green)" }}
        />
      </div>
    </ConfigProvider>
  );
};

export default LoginScreen2;
