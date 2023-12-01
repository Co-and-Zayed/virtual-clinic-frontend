import { useDispatch, useSelector } from "react-redux";
import { CSSProperties } from "react";
import { RootState } from "VirtualClinic/redux/rootReducer";
import JSZip from "jszip";
import axios from "axios";
import store from "VirtualClinic/redux/store";
import { UPDATE_USER_DATA } from "VirtualClinic/redux/User/loginTypes";

export const useRequests = () => {
  const dispatch: any = useDispatch();

  async function updateUserData() {
    const token = store.getState()?.userReducer?.accessToken;
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_CLINIC}userAPI/getUser`,
      {
        headers: {
          Authorization: token && token != "" ? `Bearer ${token}` : "",
        },
      }
    );

    dispatch({
      type: UPDATE_USER_DATA,
      payload: response.data.data,
    });
  }
  return { updateUserData };
};
