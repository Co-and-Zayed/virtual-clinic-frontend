import styles from "screens/VirtualClinicScreens/LoginScreen/LoginScreen2.module.css";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Input, Spin } from "antd";
import LoginModel from "models/LoginModel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/rootReducer";
import { useNavigate } from "react-router";
import { loginAction } from "redux/User/userAction";
import Logo from "assets/images/Logo.svg";

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
    <div
      className={`${styles.background} w-full h-[100vh] flex flex-col justify-evenly items-center`}
    >
      {/* Logo */}
      <img src={Logo} alt="Logo" className="w-[5.5rem]" />

      <div className="w-[75%] h-[22rem] flex justify-center gap-x-20">
        {/* REGISTER */}
        <div className="w-2/3">Doctor | Patient</div>

        {/* Vertical divider */}
        <div
          className="h-full w-[1.25px]"
          style={{
            backgroundColor: "var(--light-green)",
            opacity: 0.4,
          }}
        />

        {/* Login Form */}
        <div className="w-1/3 flex flex-col items-start">
          <h1>Login</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-start gap-y-3"
          >
            <div className="w-full flex flex-col items-start gap-y-2">
              <Input
                className="w-[12rem]"
                size="large"
                name="username"
                placeholder="Username"
                status={formik.errors.username ? "error" : ""}
                onChange={formik.handleChange}
              />
              {formik.errors.username && (
                <p className="text-[red]">Please Enter Username</p>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-y-2">
              <Input
                className="w-[12rem]"
                size="large"
                type="password"
                name="password"
                placeholder="password"
                status={formik.errors.password ? "error" : ""}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <p className="text-[red]">Please Enter Password</p>
              )}
            </div>
            <div className="w-full flex flex-row items-center justify-start gap-x-1">
              <p>Don't Have An Account Yet ? Register</p>
              <p
                className="text-[blue] hover:cursor-pointer"
                onClick={() => navigate("/register")}
              >
                here
              </p>
            </div>
            {loginLoading ? (
              <Spin />
            ) : (
              <button
                type="submit"
                className={`w-full ${styles.loginBtn}`}
              >
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
        <p className={`${styles.greenText} px-6`}>Virtual Clinic</p>
        <div
          className="w-full h-[1.25px]"
          style={{ backgroundColor: "var(--light-green)" }}
        />
      </div>
    </div>
  );
};

export default LoginScreen2;
