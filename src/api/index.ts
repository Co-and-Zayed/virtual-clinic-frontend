/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import store from "redux/store";
import { notification } from "antd";
import { CLEAR_TIMEOUTS, REFRESH_TIMEOUT } from "redux/User/loginTypes";

// Change The Api Url
const apiURL = process.env.REACT_APP_BACKEND_CLINIC;

const instance = axios.create({
  baseURL: apiURL,
});

/*
    When The login reducer is setup change this code accordingly 
    to insert the token in the Authorization header
*/

instance.interceptors.request.use(
  async (config: any) => {
    const token = store.getState()?.userReducer?.accessToken;

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
      config.headers!.mode = `no-cors`;
      config.data = {
        ...config.data,
        refreshToken: store.getState()?.userReducer?.refreshToken,
      };
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

const checkAuth = async (notificationParam: any) => {
  if (window.location.pathname === "/login") {
    notificationParam.message = "Invalid credentials";
    notificationParam.description = "Please check user name or password";
  } else {
    // store.dispatch(logoutAction());
    notificationParam.message = "Your session has expired";
    // notificationParam.description = "Please login again";
    await store.dispatch({
      type: CLEAR_TIMEOUTS,
    });
    await store.dispatch({ type: "LOG_OUT" });
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
