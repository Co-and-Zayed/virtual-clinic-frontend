/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import store from "Redux/store";
import { notification } from "antd";

// Change The Api Url
const apiURL = "http://127.0.0.1:8000/";

const instance = axios.create({
  baseURL: apiURL,
});

/*
    When The login reducer is setup change this code accordingly 
    to insert the token in the Authorization header
*/ 

// if (store.getState()?.loginReducer?.user?.token) {
//   instance.interceptors.request.use(
//     async (config: any) => {
//       const token = store.getState()?.loginReducer?.user?.token;
//       if (token) {
//         config.headers!.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     async (error) => {
//       return await Promise.reject(error);
//     }
//   );
// }


const checkAuth = (notificationParam: any) => {
  if (window.location.pathname === "/login") {
    notificationParam.message = "Authentication Fail";
    notificationParam.description = "Please check user name or password";
  } else {
    // store.dispatch(logoutAction());
    notificationParam.message = "Authentication Fail";
    notificationParam.description = "Please login again";
    store.dispatch({ type: "LOG_OUT" });
  }
};

// errors Handling
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const notificationParam = {
      message: "",
      description: "",
      style: {
        zIndex: 99999999999999,
      },
    };

    switch (error.response?.status) {
      case 401:
        checkAuth(notificationParam);
        break;
      case 400:
        notificationParam.message = "Bad Request";
        notificationParam.description = "Check that data is being sent";
        window.location.href = "/404";
        break;
      case 404:
        notificationParam.message = "Not Found";
        break;
      case 422:
        notificationParam.message = "Authentication Failed";
        notificationParam.description =
          "Wrong email/password, check your credentials";
        break;
      case 500:
        notificationParam.message = "Internal Server Error";
        // window.location.href = "/404";
        break;
      case 508:
        notificationParam.message = "Time Out";
        notificationParam.description = "The server terminated an operation";
        break;
      default:
        break;
    }

    if (notificationParam.message) notification.error(notificationParam);
    return await Promise.reject(error);
  }
);
export default instance;
