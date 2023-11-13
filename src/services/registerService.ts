import api from "api";
import { registerUrl } from "api/apiUrls";
import axios from "axios";

export const registerService = async (data: any) => {
  console.log("REGISTER SERVICE");
  console.log("DATA", data);
  const formData = new FormData();

  // // Append text fields

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("type", data.type);
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("date_of_birth", data.date_of_birth);
  formData.append("gender", data.gender);
  formData.append("mobileNumber", data.mobileNumber);
  formData.append("healthRecords", data.healthRecords);
  formData.append("emergencyContactName", data.emergencyContactName);
  formData.append("emergencyContactNumber", data.emergencyContactNumber);
  // formData.append("files", data.files);
  // // Append files
  // console.log("FILES", data.files.objects);
  if (data.files) {
    for (let i = 0; i < Array.from(data.files).length; i++) {
      formData.append(`files`, data.files[i]);
    }
  }

  console.log("FORM DATA", formData);

  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}${registerUrl()}`,
    formData
  );

  return response;
};
