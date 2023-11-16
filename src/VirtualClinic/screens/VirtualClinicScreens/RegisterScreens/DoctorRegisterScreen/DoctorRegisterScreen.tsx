import { DatePicker, Input, Select, Spin } from "antd";
import { useFormik } from "formik";
import DoctorRegisterModel from "VirtualClinic/models/DoctorRegisterModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useNav } from "hooks/useNav";
import { regsiterAction } from "VirtualClinic/redux/Register/registerAction";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";

const DoctorRegisterScreen = () => {
  const navigate = useNav();

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
      gender: "",
      specialty: "",
      date_of_birth: "",
      affiliation: "",
      educationalBackground: "",
      hourlyRate: "",
    },
    onSubmit: async (values: DoctorRegisterModel) => {
      var errorExists = false;
      if (values.name.trim() === "") {
        console.log("name");
        formik.setFieldError("name", "");
        errorExists = true;
      }
      if (values.email.trim() === "") {
        console.log("email");
        formik.setFieldError("email", "");
        errorExists = true;
      }
      if (values.username.trim() === "") {
        console.log("username");
        formik.setFieldError("username", "");
        errorExists = true;
      }
      if (values.password.trim() === "") {
        console.log("password");
        formik.setFieldError("password", "");
        errorExists = true;
      }
      if (values.gender.trim() === "") {
        console.log("gender");
        formik.setFieldError("gender", "");
        errorExists = true;
      }
      if (values.specialty.trim() === "") {
        console.log("specialty");
        formik.setFieldError("specialty", "");
        errorExists = true;
      }
      if (values.date_of_birth.trim() === "") {
        console.log("date");
        formik.setFieldError("date_of_birth", "");
        errorExists = true;
      }
      if (values.affiliation.trim() === "") {
        formik.setFieldError("affiliation", "");
        errorExists = true;
      }
      if (values.educationalBackground.trim() === "") {
        formik.setFieldError("educationalBackground", "");
        errorExists = true;
      }
      if (values.hourlyRate.trim() === "") {
        formik.setFieldError("hourlyRate", "");
        errorExists = true;
      }

      if (!errorExists) {
        await dispatch(
          regsiterAction({
            name: values.name,
            email: values.email,
            type: "DOCTOR",
            username: values.username,
            password: values.password,
            gender: values.gender,
            specialty: values.specialty,
            date_of_birth: values.date_of_birth,
            affiliation: values.affiliation,
            educationalBackground: values.educationalBackground,
            hourlyRate: values.hourlyRate,
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

  return (
    <div className="w-full flex flex-col items-center gap-y-3">
      <h1>Doctor Regsitration</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col items-center"
      >
        <div className="w-full flex flex-row justify-center items-center gap-x-3">
          <div className="flex flex-col items-start">
            <p>Name</p>
            <Input
              className="w-[12rem]"
              name="name"
              placeholder="Enter your name"
              status={formik.errors.name ? "error" : ""}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col items-start">
            <p>Email</p>
            <Input
              className="w-[12rem]"
              type="email"
              name="email"
              placeholder="Enter your email"
              status={formik.errors.email ? "error" : ""}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col items-start">
            <p>Password</p>
            <Input
              type="password"
              className="w-[12rem]"
              name="password"
              placeholder="Enter your password"
              status={formik.errors.password ? "error" : ""}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-x-3">
          <div className="flex flex-col items-start">
            <p>Username</p>
            <Input
              className="w-[12rem]"
              name="username"
              placeholder="Enter your name"
              status={formik.errors.name ? "error" : ""}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col items-start">
            <p>Gender</p>
            <Select
              className="w-[12rem]"
              options={GENDER_VALUES}
              onSelect={(value: any) => formik.setFieldValue("gender", value)}
              placeholder="Enter your gender"
              status={formik.errors.gender ? "error" : ""}
            />
          </div>
          <div className="flex flex-col items-start">
            <p>Specialty</p>
            <Input
              className="w-[12rem]"
              name="specialty"
              placeholder="Enter your Specialty"
              status={formik.errors.specialty ? "error" : ""}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-x-3">
          <div className="flex flex-col items-start">
            <p>Date Of Birth</p>
            <DatePicker
              format={"YYYY-MM-DD"}
              className="w-[12rem]"
              placeholder="Enter birth date"
              status={formik.errors.date_of_birth ? "error" : ""}
              onChange={(date: any, dateString: any) => {
                formik.setFieldValue("date_of_birth", dateString);
              }}
            />
          </div>
          <div className="flex flex-col items-start">
            <p>Affiliation</p>
            <Input
              className="w-[12rem]"
              name="affiliation"
              placeholder="Enter your affiliation"
              status={formik.errors.affiliation ? "error" : ""}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col items-start">
            <p>Educational Background</p>
            <Input
              className="w-[12rem]"
              name="educationalBackground"
              placeholder="Enter your educational background"
              status={formik.errors.educationalBackground ? "error" : ""}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-x-3">
          <div className="flex flex-col items-start">
            <p>Hourly Rate</p>
            <Input
              className="w-[12rem]"
              name="hourlyRate"
              placeholder="Enter your hourly rate"
              status={formik.errors.hourlyRate ? "error" : ""}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        {registerLoading ? (
          <JellyLoader />
        ) : (
          <button
            type="submit"
            className="px-6 py-2 mt-3"
            style={{
              backgroundColor: "blue",
              borderRadius: "0.2rem",
            }}
          >
            <p className="text-white">Register</p>
          </button>
        )}
      </form>
    </div>
  );
};

export default DoctorRegisterScreen;
