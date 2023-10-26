import { useFormik } from "formik";
import { useEffect } from "react";
import { Input, Spin } from "antd";
import LoginModel from "models/LoginModel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/rootReducer";
import { useNavigate } from "react-router";
import { loginAction } from "redux/User/userAction";
import JellyLoader from "components/JellyLoader/JellyLoader";

const LoginScreen = () => {
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

  // useEffect(() => {
  //   dispatch({ type: "LOGIN_LOADING", payload: false });
  // }, []);

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <h1>Login</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col items-center gap-y-3"
      >
        <div className="w-full flex flex-col items-center gap-y-2">
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
        <div className="w-full flex flex-col items-center gap-y-2">
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
        <div className="w-full flex flex-row items-center justify-center gap-x-1">
          <p>Don't Have An Account Yet ? Register</p>
          <p
            className="text-[blue] hover:cursor-pointer"
            onClick={() => navigate("/register")}
          >
            here
          </p>
        </div>
        {loginLoading ? (
          <JellyLoader />
        ) : (
          <button
            type="submit"
            className="px-6 py-2"
            style={{
              backgroundColor: "blue",
              borderRadius: "0.2rem",
            }}
          >
            <p className="text-white">Login</p>
          </button>
        )}
      </form>
    </div>
  );
};

export default LoginScreen;
