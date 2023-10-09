import { useFormik } from "formik";
import { useEffect } from "react";
import { Input, Spin } from "antd";
import LoginModel from "models/LoginModel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "Redux/rootReducer";
import { useNavigate } from "react-router";
import { loginAction } from "Redux/Login/loginAction";

const LoginScreen = () => {
  const navigate = useNavigate();

  const dispatch: any = useDispatch();

  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.loginReducer
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: LoginModel) => {
      var errorExists = false;
      if (values.email.trim() === "") {
        formik.setFieldError("email", "Enter Email");
        errorExists = true;
      }
      if (values.email.trim() === "") {
        formik.setFieldError("password", "Enter Email");
        errorExists = true;
      }
      if (!errorExists) {
        await dispatch(
          loginAction({
            email: values.email,
            password: values.password,
          })
        );

        if (userType === "DOCTOR") {
          console.log(userType);
            navigate("/dashboard");
        }
      }
    },
  });

  useEffect(() => {
    if (userType === "DOCTOR" || userType === "PATIENT") {
      navigate("/dashboard");
    }
  }, [loginLoading, userType]);

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
            type="email"
            name="email"
            placeholder="Email@example.com"
            status={formik.errors.email ? "error" : ""}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className="text-[red]">Please Enter Email</p>
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
            <p>
              Don't Have An Account Yet ? Register
            </p>
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
