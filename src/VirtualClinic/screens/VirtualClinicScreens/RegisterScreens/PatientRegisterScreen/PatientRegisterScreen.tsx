import { DatePicker, Input, Select, Spin } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNav } from "VirtualClinic/hooks/useNav";
import { RootState } from "VirtualClinic/redux/rootReducer";
import PatientRegisterModel from "VirtualClinic/models/PatientRegisterModel";
import { regsiterAction } from "VirtualClinic/redux/Register/registerAction";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";

const PatientRegisterScreen = () => {
  const navigate = useNav();

  const dispatch: any = useDispatch();

  const { registerLoading } = useSelector(
    (state: RootState) => state.registerReducer
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      gender: "",
      date_of_birth: "",
      mobileNumber: "",
      healthRecords: "",
      emergencyContactName: "",
      emergenyContactNumber: "",
    },
    onSubmit: async (values: PatientRegisterModel) => {
      var errorExists = false;
      if (values.name.trim() === "") {
        console.log("name");
        errorExists = true;
        formik.setFieldError("name", "");
      }
      if (values.email.trim() === "") {
        console.log("email");
        errorExists = true;
        formik.setFieldError("email", "");
      }
      if (values.username.trim() === "") {
        console.log("username");
        errorExists = true;
        formik.setFieldError("username", "");
      }
      if (values.password.trim() === "") {
        console.log("password");
        errorExists = true;
        formik.setFieldError("password", "");
      }
      if (values.date_of_birth.trim() === "") {
        console.log("date");
        errorExists = true;
        formik.setFieldError("date_of_birth", "");
      }
      if (values.gender.trim() === "") {
        console.log("gender");
        errorExists = true;
        formik.setFieldError("gender", "");
      }
      if (values.mobileNumber.trim() === "") {
        console.log("mobilenumb");
        errorExists = true;
        formik.setFieldError("mobileNumber", "");
      }
      if (values.healthRecords.trim() === "") {
        console.log("health");
        errorExists = true;
        formik.setFieldError("healthRecords", "");
      }
      if (values.emergencyContactName.trim() === "") {
        console.log("contatc nam");
        errorExists = true;
        formik.setFieldError("emergencyContactName", "");
      }
      if (values.emergenyContactNumber.trim() === "") {
        console.log("contact numbe");
        errorExists = true;
        formik.setFieldError("emergencyContactNumber", "");
      }

      if (!errorExists) {
        await dispatch(
          regsiterAction({
            name: values.name,
            email: values.email,
            type: "PATIENT",
            username: values.username,
            password: values.password,
            date_of_birth: values.date_of_birth,
            gender: values.gender,
            mobileNumber: values.mobileNumber,
            healthRecords: values.healthRecords,
            emergencyContactName: values.emergencyContactName,
            emergencyContactNumber: values.emergenyContactNumber,
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
      <h1>Patient Regsitration</h1>
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
            <p>Mobile Number</p>
            <Input
              className="w-[12rem]"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              status={formik.errors.mobileNumber ? "error" : ""}
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
            <p>Health Records</p>
            <Input
              className="w-[12rem]"
              name="healthRecords"
              placeholder="Enter your health records"
              status={formik.errors.healthRecords ? "error" : ""}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col items-start">
            <p>Emergency Contact Name</p>
            <Input
              className="w-[12rem]"
              name="emergencyContactName"
              placeholder="Enter your emergency contact name"
              status={formik.errors.emergencyContactName ? "error" : ""}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-x-3">
          <div className="flex flex-col items-start">
            <p>Emergency Contact Number</p>
            <Input
              className="w-[12rem]"
              name="emergenyContactNumber"
              placeholder="Enter your emergency contact name"
              status={formik.errors.emergenyContactNumber ? "error" : ""}
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

export default PatientRegisterScreen;
