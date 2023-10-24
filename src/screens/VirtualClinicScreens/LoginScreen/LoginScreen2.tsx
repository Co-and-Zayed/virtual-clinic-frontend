import styles from "screens/VirtualClinicScreens/LoginScreen/LoginScreen2.module.css";
import { useFormik } from "formik";
import { useEffect } from "react";
import { ConfigProvider, Input, Spin, theme } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import LoginModel from "models/LoginModel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/rootReducer";
import { useNavigate } from "react-router";
import { loginAction } from "redux/User/userAction";
import Logo from "assets/images/Logo.svg";
import Doctor from "assets/images/Doctor.svg";
import Patient from "assets/images/Patient.svg";

const LoginScreen2 = () => {
  const navigate = useNavigate();

  const dispatch: any = useDispatch();

  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

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

  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],

        token: {
          colorPrimary: "var(--light-green)",
        },

        // Input Component
        components: {
          Input: {
            colorBgContainer: "#00000000",
          },
        },
      }}
    >
      <div
        className={`${styles.background} w-full h-[100vh] flex flex-col justify-center items-center`}
      >
        {/* Logo */}
        <img src={Logo} alt="Logo" className="w-[5.5rem] mb-5" />

        <div
          className="h-[35rem] flex justify-center gap-x-20"
          style={{
            // width: preffered: 75%, min: 1080px, max: 1440px
            width: "clamp(1250px, 75vw, 1800px)",
          }}
        >
          {/* REGISTER */}
          <div className="w-[50rem] flex flex-col">
            <h2 className="mb-[2rem]">Register</h2>
            <div className="flex justify-between flex-1">
              {/* DOCTOR */}
              <div className={`${styles.registerCard} gap-y-14`}>
                <img
                  src={Doctor}
                  alt="Doctor"
                  className={`w-[10rem] h-[10rem] ${styles.registerCardImage}`}
                />
                <h1>Doctor</h1>
                <div className={`${styles.registerCardCircle}`}></div>
              </div>
              {/* PATIENT */}
              <div className={`${styles.registerCard} gap-y-14`}>
                <div className={`${styles.registerCardCircle}`}></div>
                <img
                  src={Patient}
                  alt="Patient"
                  className={`w-[10rem] h-[10rem] ${styles.registerCardImage}`}
                />
                <h1>Patient</h1>
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
            <h2 className="mb-[2rem]">Login</h2>
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-start gap-y-3"
            >
              <div className="w-full flex flex-col items-start gap-y-2 mb-5">
                <p className="text-white text-xl">Username</p>
                <Input
                  className={`${styles.inputField}`}
                  size="large"
                  name="username"
                  // placeholder="Username"
                  status={formik.errors.username ? "error" : ""}
                  onChange={formik.handleChange}
                />
                {formik.errors.username && (
                  <p className="text-[red]">Please Enter Username</p>
                )}
              </div>
              <div className="w-full flex flex-col items-start gap-y-2 mb-5">
                <p className="text-white text-xl">Password</p>
                <Input.Password
                  className={`${styles.inputField}`}
                  size="large"
                  type="password"
                  name="password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  // placeholder="password"
                  status={formik.errors.password ? "error" : ""}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && (
                  <p className="text-[red]">Please Enter Password</p>
                )}
                <div
                  className="w-full flex flex-row items-center justify-start gap-x-1 "
                  style={{ fontSize: "0.75rem", opacity: 0.7 }}
                >
                  <p className="text-[white]">Forgot your password? Click </p>
                  <p
                    className="hover:cursor-pointer greenText"
                    // onClick={() => navigate("/register")}
                  >
                    <u>here</u>
                  </p>
                </div>
              </div>

              {loginLoading ? (
                <Spin />
              ) : (
                <button type="submit" className={`w-full ${styles.loginBtn}`}>
                  <p className="text-white">Login</p>
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Horizontal divider with "Virtual Clinic" in the center */}
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
      </div>
    </ConfigProvider>
  );
};

export default LoginScreen2;
